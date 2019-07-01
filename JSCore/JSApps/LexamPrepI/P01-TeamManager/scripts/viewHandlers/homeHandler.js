HANDLERS.homeHandler = function (context) {
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    if (authService.hasTeam()) {
        context.hasTeam = authService.hasTeam();
        context.teamId = sessionStorage.getItem('teamId');
    }

    context.loadPartials({
        header: './views/common/header.hbs',
        footer: './views/common/footer.hbs',
    }).then(function () {
        this.partial('./views/home/home.hbs');
    });
};

HANDLERS.aboutHandler = function (context) {
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './views/common/header.hbs',
        footer: './views/common/footer.hbs',
    }).then(function () {
        this.partial('./views/about/about.hbs');
    });
};