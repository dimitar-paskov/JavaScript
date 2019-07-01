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
    let password = context.params.pass;
    let repeatPass = context.params.checkPass;



    regexUsername = /^[a-zA-Z]{3,}$/g;
    regexPassword = /^[a-zA-Z0-9]{6,}$/g;


    if(!regexUsername.test(username)){
        notifications.showError('Username shoud be at least 3 symbolss, and shoud contain only english alphabet characters');
    }else if(!regexPassword.test(password)){
        notifications.showError('Password shoud be at least 6 symbolss, and shoud contain only english alphabet characters or digits');
    }else if (password !== repeatPass) {
        notifications.showError('Passwords do not match!');
    } else {
        console.log('Reg pass: ' + password + 'stop');
        console.log('Reg repeat pass: ' + password + 'stop');
        authService.register(username, password, context).then(res => {
            authService.saveSession(res);
            notifications.showInfo('User registration successful.');
            context.redirect('#/home');
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
    let password = context.params.pass;

    console.log("Login Pass: " + password);


    authService.login(username, password).then(res => {
        authService.saveSession(res);
        notifications.showInfo('Login successful.');
        context.redirect('#/catalog');

    }).catch(notifications.handleError);
};

CONTROLLERS.logoutController = function (context) {
    authService.logout().then(() => {
        authService.clearSession();
        notifications.showInfo('Logout successful.');
        context.redirect('#/login');
    }).catch(notifications.handleError);
};