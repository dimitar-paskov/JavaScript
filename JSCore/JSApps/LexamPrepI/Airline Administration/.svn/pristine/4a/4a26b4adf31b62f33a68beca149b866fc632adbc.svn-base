const home = (function () {
    const index = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');

            return;
        }

        let flights = flightModel.publicFlights()
            .done(function (data) {
                ctx.flights = data;

                ctx.partial('views/home/index.hbs');
            });

    };

    return {
        index
    };
}());