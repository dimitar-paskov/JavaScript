const CONTROLLERS = {};

$(() => {
    const APP = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/index.html', CONTROLLERS.homeController);
        this.get('#/home', CONTROLLERS.listFlightsController);

        this.get('#/register', CONTROLLERS.registerGetController);
        this.post('#/register', CONTROLLERS.registerPostController);

        this.get('#/login', CONTROLLERS.loginGetController);
        this.post('#/login', CONTROLLERS.loginPostController);

        this.get('#/logout', CONTROLLERS.logoutController);

        this.get('#/catalog', CONTROLLERS.listFlightsController);
        this.get('#/catalog/:flightId', CONTROLLERS.flightDetailsController);

        this.get('#/create', CONTROLLERS.createFlightGetController);
        this.post('#/create', CONTROLLERS.createFlightPostController);

        this.get('#/edit/:flightId', CONTROLLERS.editFlightGetController);
        this.post('#/edit/:flightId', CONTROLLERS.editFlightPostController);

        this.get('#/delete/:flightId', CONTROLLERS.deleteFlightGetController);

        this.get('#/myFlights', CONTROLLERS.myFlightsGetController);

        //TODO da disable buttons for consecutive press



        // this.get("", function () {
        //     this.app.runRoute("get", "#home");
        // });

    });

    APP.run('#/index.html');
});