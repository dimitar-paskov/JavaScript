let crudService = (() => {
    const APPDATA_MODULE = 'appdata';
    const AUTH = 'kinvey';
    const ENTITY = 'flights/';
    const ENTITYQ = 'flights';

    function loadFlights() {
        return requester.get(APPDATA_MODULE, ENTITYQ+'?query={"isPublic":true}', AUTH);
    }

    function loadMyFlights(userId) {
        return requester.get(APPDATA_MODULE, ENTITYQ+`?query={"_acl.creator":"${userId}"}`, AUTH);
    }

    function loadFlightDetails(flightId) {
        return requester.get(APPDATA_MODULE, ENTITY + flightId, AUTH);
    }


    function editFlight(flightId, destination, origin, departureDate, departureTime, seatsCount, costPerSeat, image, isPublic) {
        let flightData = {
            destination,
            origin,
            departureDate,
            departureTime,
            seatsCount,
            costPerSeat,
            image,
            isPublic
        };

        return requester.update(APPDATA_MODULE, ENTITY + flightId, AUTH, flightData);
    }

    function createFlight(destination, origin, departureDate, departureTime, seatsCount, costPerSeat, image, isPublic) {
        let flightData = {
            destination,
            origin,
            departureDate,
            departureTime,
            seatsCount,
            costPerSeat,
            image,
            isPublic
        };

        return requester.post(APPDATA_MODULE, ENTITY, AUTH, flightData);
    }

    function deleteFlight(flightId) {
        return requester.remove(APPDATA_MODULE, ENTITY + flightId, AUTH);
    }



    return {
        loadFlights,
        loadMyFlights,
        loadFlightDetails,
        editFlight,
        createFlight,
        deleteFlight
    };
})();