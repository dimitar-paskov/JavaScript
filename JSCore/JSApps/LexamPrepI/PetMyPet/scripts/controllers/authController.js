CONTROLLERS.registerGetController = function (context) {
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        nav: './views/common/nav.hbs',
        footer: './views/common/footer.hbs'
    }).then(function () {
        this.partial('./views/register/registerPage.hbs');
    });
};

CONTROLLERS.registerPostController = function (context) {
    console.log(context.params);
    let username = context.params.username;
    let password = context.params.password;
    // let repeatPass = context.params.checkPass;

    console.log('Regpass');
    console.log(username);
    console.log(password);


    regexUsername = /^.{3,}$/g;
    regexPassword = /^.{6,}$/g;


    if(!regexUsername.test(username)){
        console.log(regexUsername);
        notifications.showError('Username shoud be at least 3 symbolss');
    }else if(!regexPassword.test(password)){
        console.log(regexPassword);
        notifications.showError('Password shoud be at least 6 symbolss');
    } else {
        console.log('Reg pass: ' + password + 'stop');
        console.log('Reg repeat pass: ' + password + 'stop');
        authService.register(username, password, context).then(res => {
            authService.saveSession(res);
            notifications.showInfo('User registration successful.');
            context.redirect('#/welcome');
        }).catch(notifications.handleError);
    }
};

CONTROLLERS.loginGetController = function (context) {

    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        nav: './views/common/nav.hbs',
        footer: './views/common/footer.hbs'
    }).then(function () {
        this.partial('./views/login/loginPage.hbs');
    });
};

CONTROLLERS.loginPostController = function (context) {
    console.log(context.params);
    let username = context.params.username;
    let password = context.params.password;

    console.log("Login Pass: " + password);


    authService.login(username, password).then(res => {
        authService.saveSession(res);
        notifications.showInfo('Login successful.');
        context.redirect('#/catalog/all');

    }).catch(notifications.handleError);
};

CONTROLLERS.logoutController = function (context) {
    authService.logout().then(() => {
        authService.clearSession();
        notifications.showInfo('Logout successful.');
        context.redirect('#/login');
    }).catch(notifications.handleError);
};