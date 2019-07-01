CONTROLLERS.listFlightsController = function (context) {
    crudService.loadFlights().then(res => {
        context.loggedIn = authService.isAuth();
        context.username = sessionStorage.getItem('username');
        context.flights = res;



        console.log(context.flights);

        notifications.showInfo('Flights listing.');
        context.loadPartials({
            nav: './views/common/nav.hbs',
            footer: './views/common/footer.hbs',
            flight: './views/listings/flight.hbs'
        }).then(function () {
            this.partial('./views/home/home.hbs');
        });

    }).catch(notifications.handleError);
};

CONTROLLERS.flightDetailsController = function (context) {
    let flightId = context.params.flightId.slice(1);
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    crudService.loadFlightDetails(flightId)
        .then(function (flight) {
            console.log(flight._acl.creator);
            console.log(sessionStorage.getItem('userId'));

            flight.isAuthor = (flight._acl.creator === sessionStorage.getItem('userId'));
            context.flight = flight;

            console.log(context.flight);
            context.loadPartials({
                nav: './views/common/nav.hbs',
                footer: './views/common/footer.hbs',
            }).then(function () {
                this.partial('./views/listings/details.hbs');
                notifications.showInfo(`Details listed.`);
            });
        }).catch(notifications.handleError);


};

CONTROLLERS.createFlightGetController = function (context) {
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        nav: './views/common/nav.hbs',
        footer: './views/common/footer.hbs',
    }).then(function () {
        this.partial('./views/create/createPage.hbs');
    });
};

CONTROLLERS.createFlightPostController = function (context) {
    let destination = context.params.destination;
    let origin = context.params.origin;
    let departureDate = context.params.departureDate;
    let departureTime = context.params.departureTime;
    let seatsCount = context.params.seats;
    let costPerSeat = context.params.cost;
    let image = context.params.img;
    let isPublic = context.params.public==='on';

    if(checkFormForValidData(destination, origin, departureDate, departureTime, seatsCount, costPerSeat, image, isPublic)){
        crudService.createFlight(destination, origin, departureDate, departureTime, seatsCount, costPerSeat, image, isPublic)
            .then(res => {
            notifications.showInfo("Created flight.");
            context.redirect('#/home');
        }).catch(notifications.handleError);
    }


};

CONTROLLERS.editFlightGetController = function (context) {
    let flightId = context.params.flightId.slice(1);
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    crudService.loadFlightDetails(flightId)
        .then(function (flight) {
            context.flight = flight;
            context.loadPartials({
                nav: './views/common/nav.hbs',
                footer: './views/common/footer.hbs',
            }).then(function () {
                this.partial('./views/edit/editPage.hbs');
            });

        });

};

CONTROLLERS.editFlightPostController = function (context) {
    let flightId = context.params.flightId.slice(1);
    let destination = context.params.destination;
    let origin = context.params.origin;
    let departureDate = context.params.departureDate;
    let departureTime = context.params.departureTime;
    let seatsCount = context.params.seats;
    let costPerSeat = context.params.cost;
    let image = context.params.img;
    let isPublic = context.params.public==='on';

    if(checkFormForValidData(destination, origin, departureDate, departureTime, seatsCount, costPerSeat, image, isPublic)){
        crudService.editFlight(flightId, destination, origin, departureDate, departureTime, seatsCount, costPerSeat, image, isPublic)
            .then(() => {
            notifications.showInfo(`Flight successfully edited.`);
            context.redirect(`#/catalog/:${flightId}`);
        }).catch(notifications.handleError);
    }

};

function checkFormForValidData(destination, origin, departureDate, departureTime, seatsCount, costPerSeat, image, isPublic){
    if(destination.length === 0 || origin.length === 0){
        notifications.showError('Destination and origin should not be blanc');
    }else if(seatsCount < 0 || costPerSeat < 0){
        notifications.showError('seats and costs should be positive');
    }else{
        return true;
    }

    return false;
}

CONTROLLERS.deleteFlightGetController = function (context) {
    let flightId = context.params.flightId.slice(1);
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    crudService.deleteFlight(flightId)
        .then(function () {
        notifications.showInfo("The flight was deleted");
        context.redirect('#/catalog');

    }).catch(notifications.handleError);

};

CONTROLLERS.myFlightsGetController = function (context) {
    context.loggedIn = authService.isAuth();
    context.userId = sessionStorage.getItem('userId');

    crudService.loadMyFlights(context.userId).then(res => {

        context.flights = res;

        console.log(context.flights);


        context.loadPartials({
            nav: './views/common/nav.hbs',
            footer: './views/common/footer.hbs',
            myFlight: './views/mylistings/myFlight.hbs'
        }).then(function () {
            this.partial('./views/mylistings/myFlightsPage.hbs');
            notifications.showInfo('Flights listed.');
        });

    }).catch(notifications.handleError);


}

