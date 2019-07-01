$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('/index.html', displayHome);
        this.get('#/home', displayHome);
        this.get('#/about', function (context) {

            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('templates/about/about.hbs');
            });
        });

        this.get('#/login', function (context) {

            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: 'templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('templates/login/loginPage.hbs');
            });

        });
        this.post('#/login', function (context) {
            let username = this.params.username;
            let password = this.params.password;

            auth.login(username, password)
                .then(function (res) {
                    auth.saveSession(res);
                    auth.showInfo('Login Successful');
                    displayHome(context);
                });

        });

        this.get('#/register', function (context) {

            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: 'templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('templates/register/registerPage.hbs');
            });

        });
        this.post('#/register', function (context) {
            let username = this.params.username;
            let password = this.params.password;
            let repeatPassword = this.params.repeatPassword;

            if (password !== repeatPassword) {
                auth.showError('The given passwords do not match');
            } else {

                auth.register(username, password)
                    .then(function (res) {
                        auth.saveSession(res);
                        auth.showInfo('Registration was successful');
                        displayHome(context);

                    })
                    .catch(auth.handleError);
            }
        });

        this.get('#/logout', function (context) {
            auth.logout()
                .then(function (res) {
                    auth.showInfo('Log out successful');
                    sessionStorage.clear();
                    context.app.setLocation('#/home');
                });
        });

        this.get('#/catalog', displayCatalog);
        this.get('#/catalog/:teamId', displayDetails);

        this.get('#/join/:teamId', joinTeam);
        this.get('#/leave', leaveTeam);


        this.get('#/create', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm:   './templates/create/createForm.hbs'
            })
                .then(function () {
                    this.partial('./templates/create/createPage.hbs');
                })

        });
        this.post('#/create', createTeamPost);

        this.get('#/edit/:teamId', editTeamGet);
        this.post('#/edit/:teamId', editTeamPost);


        function displayHome(context) {

            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.teamId = sessionStorage.getItem('teamId');
            context.hasTeam = context.teamId !== 'undefined' && context.teamId !== null;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            });
        }

        function displayCatalog(context) {

            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.teamId = sessionStorage.getItem('teamId');

            context.hasNoTeam = sessionStorage.getItem('teamId') === null || sessionStorage.getItem('teamId') === 'undefined' ;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                team:   './templates/catalog/team.hbs'
            }).then(function () {
                teamsService.loadTeams()
                    .then( (res) => {
                        context.teams = res;
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    })

            });



        }

        function displayDetails(context) {
            let teamId = context.params.teamId.slice(1);
            let teamInfo;
            let membersInfo;

            getTeamInfo();

            function getTeamInfo() {

                Promise.all([
                    crudService.loadTeamDetails(teamId),
                    crudService.loadTeamMembers(teamId)
                ]).then(function (values) {
                    teamInfo = values[0];
                    membersInfo = values[1];
                }).then(() => {
                    context.loggedIn = sessionStorage.getItem('authtoken') !== 'undefined' && sessionStorage.getItem('authtoken') !== null;
                    context.username = sessionStorage.getItem('username');
                    context.hasNoTeam = sessionStorage.getItem('teamId') === 'undefined' || sessionStorage.getItem('teamId') === null;
                    context.isOnTeam = sessionStorage.getItem('teamId') !== 'undefined' && sessionStorage.getItem('teamId') !== null;
                    context.isAuthor = sessionStorage.getItem('userId') === teamInfo._acl.creator;
                    context.name = teamInfo.name;
                    context.comment = teamInfo.comment;
                    context.members = membersInfo;
                    context.teamId = teamInfo._id;


                    auth.showInfo(`Details for ${context.name} listed.`);

                    context.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        teamControls: './templates/catalog/teamControls.hbs',
                        teamMember: './templates/catalog/teamMember.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/details.hbs');
                    });
                }).catch(auth.handleError);


            }
        }

        function joinTeam(context) {
            let teamId = context.params.teamId.slice(1);
            context.teamId = teamId;
            crudService.joinTeam(teamId).then(res => {
                sessionStorage.setItem('teamId', res.teamId);
                auth.showInfo(`Join successful.`);
                context.app.setLocation(`#/home`);
            }).catch(auth.handleError);

        }

        function leaveTeam(context) {
            crudService.leaveTeam().then(() => {
                sessionStorage.removeItem('teamId');
                auth.showInfo(`Team successfully left.`);
                context.redirect('#/home');
            }).catch(auth.handleError);

        }

        function createTeamPost(context) {
            let name = context.params.name;
            let comment = context.params.comment;
            crudService.createTeam(name, comment).then(res => {
                crudService.joinTeam(res._id).then(() => {
                    sessionStorage.setItem('teamId', res._id);
                    auth.showInfo(`Team ${name} successfully created.`);
                    context.redirect('#/home');
                }).catch(auth.handleError);
            }).catch(auth.handleError);

        }

        function editTeamGet(context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== 'undefined' && sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.teamId = context.params.teamId.slice(1);

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                editForm: './templates/edit/editForm.hbs'
            }).then(function () {
                this.partial('./templates/edit/editPage.hbs');
            });

        }

        function editTeamPost(context) {
            let teamId = context.params.teamId.slice(1);
            let name = context.params.name;
            let comment = context.params.comment;

            crudService.editTeam(teamId, name, comment).then(() => {
                auth.showInfo(`Team ${name} successfully edited.`);
                context.redirect('#/home');
            }).catch(auth.handleError);
        }


    });


    app.run();
});