CONTROLLERS.homeController = function (context) {
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');


    context.loadPartials({
        nav: './views/common/nav.hbs',
        footer: './views/common/footer.hbs',
    }).then(function () {
        console.log(context.loggedIn);
        this.partial('./views/home/home.hbs');
    });
};

// CONTROLLERS.aboutController = function (context) {
//     context.loggedIn = authService.isAuth();
//     context.username = sessionStorage.getItem('username');
//
//     context.loadPartials({
//         header: './views/common/header.hbs',
//         footer: './views/common/footer.hbs',
//     }).then(function () {
//         this.partial('./views/about/about.hbs');
//     });
// };