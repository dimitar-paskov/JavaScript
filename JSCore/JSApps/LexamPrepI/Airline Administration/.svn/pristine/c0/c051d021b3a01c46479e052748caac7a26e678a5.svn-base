const flight = (function () {
    const addGet = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');

            return;
        }
        ctx.partial('views/flight/add.hbs');
    }

    const addPost = function (ctx) {
        if (!ctx.params.destination || !ctx.params.origin || !ctx.params.cost || !ctx.params.seats) {
            notifications.showError('Please fill the fields!');

            return;
        }
        flightModel.add(ctx.params).done(function () {
            notifications.showInfo('Flight added succesfully!')
            ctx.redirect('#/');
        });
    };

    const details = function (ctx) {

        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');

            return;
        }

        let flight = flightModel.getFlight(ctx.params.flightId)
            .done(function (flight) {
                if (!flight) {
                    ctx.redirect('#/');
                    return;
                }
                if (flight._acl.creator !== storage.getData('userInfo').id) {
                    flight.display = 'none';
                } else {
                    flight.display = 'inline-block';
                }
                ctx.flight = flight;
                ctx.partial('views/flight/details.hbs');

            });

    }

    const editGet = function (ctx) {
        flightModel.getFlight(ctx.params.flightId)
            .done(function (flight) {
                if (flight._acl.creator !== storage.getData('userInfo').id) {
                    notifications.showError('You can only edit your own flights!');
                    ctx.redirect('#/details/' + flight._id);
                    return;
                }

                ctx.flight = flight;
                ctx.partial('views/flight/edit.hbs');

            });
    }

    const editPost = function (ctx) {
        if (!ctx.params.destination || !ctx.params.origin || !ctx.params.cost || !ctx.params.seats) {
            notifications.showError('Please fill the fields!');

            return;
        }

        flightModel.edit(ctx.params)
            .done(function () {
                notifications.showInfo('Flight edited succesfully!')
                ctx.redirect('#/details/' + ctx.params.flightId);
            });
    }

    const myFlights = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');

            return;
        }

        let userId = storage.getData('userInfo').id;
        flightModel.myFlights(userId)
            .done(function (flights) {
                ctx.flights = flights;
                ctx.partial('views/flight/myFlights.hbs');
            })
    }

    const remove = function (ctx) {
        flightModel.remove(ctx.params.flightId)
            .done(function () {
                notifications.showInfo('Flight deleted successfully!');
                ctx.redirect('#/myFlights');
            })
    }




    return {
        addGet,
        addPost,
        details,
        editGet,
        editPost,
        myFlights,
        remove
    }
}());