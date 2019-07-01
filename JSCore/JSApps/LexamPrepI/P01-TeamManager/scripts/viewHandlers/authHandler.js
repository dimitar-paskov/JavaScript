HANDLERS.registerGetHandler = function (context) {
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './views/common/header.hbs',
        footer: './views/common/footer.hbs',
        registerForm: './views/register/registerForm.hbs',
    }).then(function () {
        this.partial('./views/register/registerPage.hbs');
    });
};

HANDLERS.registerPostHandler = function (context) {
    let username = context.params.username;
    let password = context.params.password;
    let repeatPassword = context.params.repeatPassword;

    if (password !== repeatPassword) {
        notifications.showError('Passwords do not match!');
    } else {
        authService.register(username, password, context).then(res => {
            authService.saveSession(res);
            notifications.showInfo('Registration successful.');
            context.redirect('#/home');
        }).catch(notifications.handleError);
    }
};

HANDLERS.loginGetHandler = function (context) {
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './views/common/header.hbs',
        footer: './views/common/footer.hbs',
        loginForm: './views/login/loginForm.hbs',
    }).then(function () {
        this.partial('./views/login/loginPage.hbs');
    });
};

HANDLERS.loginPostHandler = function (context) {
    let username = context.params.username;
    let password = context.params.password;

    authService.login(username, password).then(res => {
        authService.saveSession(res);
        notifications.showInfo('Login successful.');
        context.redirect('#/home');
    }).catch(notifications.handleError);
};

HANDLERS.logoutHandler = function (context) {
    authService.logout().then(() => {
        authService.clearSession();
        notifications.showInfo('Logout successful.');
        context.redirect('#/home');
    }).catch(notifications.handleError);
};