let crudService = (() => {
    const APPDATA_MODULE = 'appdata';
    const USER_MODULE = 'login';
    const AUTH = 'kinvey';
    const ENTITY = 'cars/';
    const ENTITYQ = 'cars';

    function loadCars() {
        return requester.get(APPDATA_MODULE, ENTITYQ+'?query={}&sort={"_kmd.ect": -1}', AUTH);
    }

    function loadMyCars(username) {
        return requester.get(APPDATA_MODULE, ENTITYQ+`?query={"seller":"${username}"}&sort={"_kmd.ect": -1}`, AUTH);
    }

    function loadCarDetails(carId) {
        return requester.get(APPDATA_MODULE, ENTITY + carId, AUTH);
    }


    function editCar(carId, title, description, imageUrl, brand, model, fuel, year, price, seller) {
        let carData = {
            title,
            description,
            imageUrl,
            brand,
            model,
            fuel,
            year,
            price,
            seller
        };

        return requester.update(APPDATA_MODULE, ENTITY + carId, AUTH, carData);
    }

    function createCar(title, description, imageUrl, brand, model, fuel, year, price, seller) {
        let carData = {
            title,
            description,
            imageUrl,
            brand,
            model,
            fuel,
            year,
            price,
            seller
        };

        return requester.post(APPDATA_MODULE, ENTITY, AUTH, carData);
    }

    function deleteCar(carId) {
        return requester.remove(APPDATA_MODULE, ENTITY + carId, AUTH);
    }



    return {
        loadCars,
        loadMyCars,
        loadCarDetails,
        editCar,
        createCar,
        deleteCar
    };
})();