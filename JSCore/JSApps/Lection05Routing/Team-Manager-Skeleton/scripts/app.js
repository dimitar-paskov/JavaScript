$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', displayHome);
        this.get('#/home', displayHome);

        this.get('#/about', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs');
            });
        });

        this.get('#/login', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        this.post('#/login', function (ctx) {
            auth.login(ctx.params.username, ctx.params.password).then(function (res) {
                auth.saveSession(res);
                auth.showInfo('LOGGED IN');
                displayHome(ctx);
            }).catch(function (err) {
                auth.handleError(err);
                auth.showError('INCORRECT CREDENTIALS')
            });
        });

        this.get('#/register', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        this.post('#/register', function (ctx) {
            let password = ctx.params.password;
            let repeatPassword = ctx.params.repeatPassword;

            if (password !== repeatPassword) {
                auth.showError('PASSWORDS DO NOT MATCH!');
            } else {
                auth.register(ctx.params.username, ctx.params.password)
                    .then(function (res) {
                        auth.saveSession(res);
                        auth.showInfo('SUCCESSFUL REGISTRATION');
                        displayHome(ctx);
                    })
                    .catch(function (err) {
                        auth.handleError(err);
                        auth.showError('INCORRECT CREDENTIALS')
                    });
            }
        });

        this.get('#/logout', function (ctx) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo('LOGGED OUT!');
                    displayHome(ctx);
                }).catch(auth.handleError);
        });

        this.get('#/catalog', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            teamsService.loadTeams()
                .then(function (teams) {
                    ctx.hasNoTeam = sessionStorage.getItem('teamId') === undefined || sessionStorage.getItem('teamId') === 'undefined';
                    ctx.teams = teams;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    });
                });
        });

        this.get('#/create', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/create', function (ctx) {
            teamsService.createTeam(ctx.params.name, ctx.params.comment)
                .then(function () {
                    auth.showInfo('TEAM CREATED SUCCESSFULLY!');
                    this.redirect('#/catalog');
                })
                .catch(function (err) {
                    auth.handleError(err);
                    auth.showError('INVALID TEAM DETAILS!');
                });
        });

        this.get('#/catalog/:id', function (ctx) {
            let teamId = ctx.params.id.substr(1);

            teamsService.loadTeamDetails(teamId)
                .then(function (team) {
                    ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
                    ctx.username = sessionStorage.getItem('username');
                    ctx.userId = sessionStorage.getItem('userId');
                    ctx.name = team.name;
                    ctx.comment = team.comment;
                    let users = [];
                    if (team.members !== undefined) {
                        let teamArr = JSON.parse(team.members);
                        for (let member of teamArr) {
                            users.push({username: member});
                        }
                    }
                    ctx.members = users;
                    ctx.teamId = teamId;
                    ctx.isAuthor = team._acl.creator === ctx.userId;
                    ctx.isOnTeam = team._id === sessionStorage.getItem('teamId');

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        teamMember: './templates/catalog/teamMember.hbs',
                        teamControls: './templates/catalog/teamControls.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/details.hbs');
                    });
                });
        });

        this.get('#/edit/:id', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            let teamId = ctx.params.id.substr(1);

            teamsService.loadTeamDetails(teamId).then(function (team) {
                ctx.teamId = teamId;
                ctx.name = team.name;
                ctx.comment = team.comment;

                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    editForm: './templates/edit/editForm.hbs'
                }).then(function () {
                    this.partial('./templates/edit/editPage.hbs');
                });
            }).catch(auth.handleError);

        });

        this.post('#/edit/:id', function (ctx) {
            let teamId = ctx.params.id.substr(1);
            let name = ctx.params.name;
            let comment = ctx.params.comment;

            teamsService.edit(teamId, name, comment)
                .then(function () {
                    auth.showInfo('TEAM UPDATED SUCCESSFULLY');
                    ctx.redirect('#/catalog/:' + teamId);
                }).catch(function (err) {
                auth.handleError(err);
                auth.showError('INCORRECT DETAILS!');
            })
        });

        this.get('#/join/:id', function (ctx) {
            let teamId = ctx.params.id.substr(1);

            teamsService.joinTeam(teamId)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo(`SUCCESSFULLY JOINED`);
                    ctx.redirect('#/catalog/:' + teamId);
                }).catch(auth.handleError);
        });

        this.get('#/leave', function(ctx) {
            let teamId = sessionStorage.getItem('teamId');
            teamsService.leaveTeam()
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    ctx.redirect('#/catalog/:' + teamId);
                }).catch(auth.handleError);
        });

        function displayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            });
        }
    });

    app.run();
});