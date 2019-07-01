const flightModel = function() {

    let flightUrl = `appdata/${storage.appKey}/flights`;

    const add = function(params) {
        let flight = {
            "destination":params.destination,
            "origin":params.origin,
            "departureDate":params.departureDate,
            "departureTime":params.departureTime,
            "seats":params.seats,
            "cost":params.cost,
            "image":params.img,
            "isPublic":!!params.public
          };
          return requester.post(flightUrl, flight);
          
    };

    const publicFlights = function() {
        let url = flightUrl + `?query={"isPublic":true}`;

        return requester.get(url);
    }

    const getFlight = function(flightId) {
        let url = flightUrl + `/${flightId}`;

        return requester.get(url);
    }

    const edit = function(params) {
        let url = flightUrl + `/${params.flightId}`
        let flight = {
            "destination":params.destination,
            "origin":params.origin,
            "departureDate":params.departureDate,
            "departureTime":params.departureTime,
            "seats":params.seats,
            "cost":params.cost,
            "image":params.img,
            "isPublic":!!params.public
          };
          return requester.put(url, flight);
    }

    const myFlights = function(userId) {
        let url = flightUrl + `?query={"_acl.creator":"${userId}"}`;

        return requester.get(url);
    }

    const remove = function(flightId) { 
        let url = flightUrl + '/' +flightId;

        return requester.del(url);
    }

    return {
        add,
        publicFlights,
        getFlight,
        edit,
        myFlights,
        remove
    }
}();