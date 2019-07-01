$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('/index.html', displayHome);
        this.get('#/home', displayHome);

        this.get('#/about', function (ctx) {

            ctx.loggedIn = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: path.headerPath,
                footer: path.footerPath
            }).then(function () {
                this.partial(path.aboutPath)
            })
        });

        this.get('#/login', function (ctx) {

            ctx.loadPartials({
                header: path.headerPath,
                footer: path.footerPath,
                loginForm: path.loginFormPath
            }).then(function () {
                this.partial(path.loginPagePath);
            })

        });

        this.post('#/login', function (ctx) {
            let username = ctx.params.username.trim();
            let password = ctx.params.password.trim();

            if (!/[A-Za-z]{3,}/.test(username)) {
                auth.showError('Username must consist of letters only and 3 or more characters long!');
            } else if (!/[A-Za-z0-9]{3,}/.test(password)) {
                auth.showError('Password must consist of letters and digits only and 6 or more characters long!');
            } else {
                auth.login(username, password)
                    .then((userData) => {
                        auth.saveSession(userData);
                        auth.showInfo('Login successful.');
                        ctx.redirect('#/home');
                    });
            }
        });

        this.get('#/logout', function (ctx) {
            auth.logout()
                .then(() => {
                    sessionStorage.clear();
                    ctx.redirect('#/home');
                });

        });

        this.get('#/register', function (ctx) {

            ctx.loadPartials({
                header: path.headerPath,
                footer: path.footerPath,
                registerForm: path.registerFormPath
            }).then(function () {
                this.partial(path.registerPagePath)
            });
        });

        function isValidInput(username, password, repeatPass) {
            if (!/[A-Za-z]{3,}/.test(username)) {
                auth.showError('Username must consist of letters only and 3 or more characters long!');
                return;
            } else if (!/[A-Za-z0-9]{3,}/.test(password)) {
                auth.showError('Password must consist of letters and digits only and 6 or more characters long!');
                return;
            } else if (password !== repeatPass) {
                auth.showError('Passwords should match!');
                return;
            }
            return true;
        }

        this.post('#/register', function (ctx) {
            let username = ctx.params.username.trim();
            let password = ctx.params.password.trim();
            let repeatPass = ctx.params.repeatPassword.trim();

            if (isValidInput(username, password, repeatPass)) {
                auth.register(username, password)
                    .then((userData) => {
                        auth.saveSession(userData);
                        auth.showInfo('User registration successful.');
                        ctx.redirect('#/home');
                    });
            }
        });

        this.get('#/catalog', function (ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            teamsService.loadTeams()
                .then(function (data) {
                    ctx.loggedIn = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.hasTeam = sessionStorage.getItem('teamId') !== null;
                    ctx.hasNoTeam = sessionStorage.getItem('teamId') === 'undefined'
                        || sessionStorage.getItem("teamId") === null;
                    ctx.teams = data;
                    ctx.loadPartials({
                        header: path.headerPath,
                        footer: path.footerPath,
                        team: path.teamPath
                    }).then(function () {
                        this.partial(path.teamCatalogPath)
                    });

                });
        });

        this.get('#/create', function (ctx) {
            ctx.loggedIn = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            ctx.teamId = sessionStorage.getItem('teamId') !== 'undefined'
                || sessionStorage.getItem("teamId") !== null;

            ctx.loadPartials({
                header: path.headerPath,
                footer: path.footerPath,
                createForm: path.createFormPath
            }).then(function () {
                this.partial(path.createPagePath)
            });
        });

        this.post('#/create', function (ctx) {
            let name = ctx.params.name;
            let comment = ctx.params.comment;

            teamsService.createTeam(name, comment)
                .then(function (data) {
                    teamsService.joinTeam(data._id)
                        .then((newData) => {
                            auth.saveSession(newData);
                            auth.showInfo('Team creation successful!');
                            ctx.redirect('#/catalog');
                        });
                })
        });

        this.get('#/catalog/:id', function (ctx) {
            let teamId = ctx.params.id.substr(1);
            teamsService.loadTeamDetails(teamId)
                .then(function (teamInfo) {
                    ctx.loggedIn = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.name = teamInfo.name;
                    ctx.comment = teamInfo.comment;
                    ctx.teamId = teamInfo._id;
                    ctx.isOnTeam = teamInfo._id === sessionStorage.getItem('teamId');
                    ctx.isAuthor = teamInfo._acl.creator === sessionStorage.getItem('userId');
                    teamsService.getMembers(teamId)
                        .then(function (data) {
                            ctx.members = data;
                            ctx.loadPartials({
                                header: path.headerPath,
                                footer: path.footerPath,
                                teamMember: path.teamMemberPath,
                                teamControls: path.teamControlsPath
                            }).then(function () {
                                this.partial(path.detailsPath);
                            });
                        });
                });
        });

        this.get('#/edit/:id', function (ctx) {
            let teamId = ctx.params.id.substr(1);
            ctx.loggedIn = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            teamsService.loadTeamDetails(teamId)
                .then(function (data) {
                    ctx.teamId = teamId;
                    ctx.name = data.name;
                    ctx.comment = data.comment;

                    ctx.loadPartials({
                        header: path.headerPath,
                        footer: path.footerPath,
                        editForm: path.editFormPath
                    }).then(function () {
                        this.partial(path.editPagePath)
                    });
                });
        });

        this.post('#/edit/:id', function (ctx) {
            let teamId = ctx.params.id.substr(1);
            ctx.loggedIn = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            teamsService.loadTeamDetails(teamId)
                .then(function (data) {
                    let name = ctx.params.name;
                    let comment = ctx.params.comment;

                    if (name === data.name && comment === data.comment) {
                        auth.showError("No changes were made!");
                        return;
                    }

                    teamsService.edit(teamId, name, comment)
                        .then(function () {
                            auth.showInfo('Team edited successfully!');
                            ctx.redirect(`#/catalog/:${teamId}`);
                        });
                });
        });

        this.get('#/leave', function (ctx) {
            teamsService.leaveTeam()
                .then(function (data) {
                    auth.saveSession(data);
                    auth.showInfo('Team has been left!');
                    ctx.redirect('#/catalog')
                })
        });

        this.get('#/join/:id', function (ctx) {
            let teamId = this.params.id.substr(1);

            if (sessionStorage.getItem("teamId") !== undefined
                || sessionStorage.getItem("teamId") !== teamId) {
                auth.showError("You can be member of one team at once!");
                ctx.redirect(`#/catalog/:${sessionStorage.getItem("teamId")}`);
                return;
            }

            teamsService.joinTeam(teamId)
                .then((data) => {
                    auth.saveSession(data);
                    auth.showInfo('Team has been joined!');
                    ctx.redirect(`#/catalog/:${teamId}`);
                });
        });

        function displayHome(ctx) {
            ctx.loggedIn = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            ctx.hasTeam = sessionStorage.getItem('teamId') !== 'undefined';
            ctx.teamId = sessionStorage.getItem('teamId');
            ctx.loadPartials({
                header: path.headerPath,
                footer: path.footerPath
            }).then(function () {
                this.partial(path.homePath)
            });
        }
    });

    app.run('#/home');
});