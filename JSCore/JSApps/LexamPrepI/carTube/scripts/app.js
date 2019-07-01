const CONTROLLERS = {};

$(() => {
    const APP = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/index.html', CONTROLLERS.homeController);
        this.get('#/home', CONTROLLERS.homeController);

        this.get('#/register', CONTROLLERS.registerGetController);
        this.post('#/register', CONTROLLERS.registerPostController);

        this.get('#/login', CONTROLLERS.loginGetController);
        this.post('#/login', CONTROLLERS.loginPostController);

        this.get('#/logout', CONTROLLERS.logoutController);

        this.get('#/catalog', CONTROLLERS.listCarsController);
        this.get('#/catalog/:carId', CONTROLLERS.carDetailsController);

        this.get('#/create', CONTROLLERS.createCarGetController);
        this.post('#/create', CONTROLLERS.createCarPostController);

        this.get('#/edit/:carId', CONTROLLERS.editCarGetController);
        this.post('#/edit/:carId', CONTROLLERS.editCarPostController);

        this.get('#/delete/:carId', CONTROLLERS.deleteCarGetController);

        this.get('#/myCars', CONTROLLERS.myCarsGetController);

        //TODO da disable buttons for consecutive press



        // this.get("", function () {
        //     this.app.runRoute("get", "#home");
        // });

    });

    APP.run('#/index.html');
});