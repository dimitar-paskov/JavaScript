CONTROLLERS.listCarsController = function (context) {
    crudService.loadCars().then(res => {
        context.loggedIn = authService.isAuth();
        context.username = sessionStorage.getItem('username');
        context.cars = res;

        context.cars.forEach(car => {
            car.isAuthor = (car.seller === context.username);
        });


        console.log(context.cars);

        notifications.showInfo('Cars listed.');
        context.loadPartials({
            nav: './views/common/nav.hbs',
            footer: './views/common/footer.hbs',
            car: './views/listings/car.hbs'
        }).then(function () {
            this.partial('./views/listings/carList.hbs');
        });

    }).catch(notifications.handleError);
};

CONTROLLERS.carDetailsController = function (context) {
    let carId = context.params.carId.slice(1);
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    crudService.loadCarDetails(carId)
        .then(function (car) {
            car.isAuthor = (car.seller === context.username);
            context.car = car;
            console.log(context.car);
            notifications.showInfo(`Details listed.`);
            context.loadPartials({
                nav: './views/common/nav.hbs',
                footer: './views/common/footer.hbs',
            }).then(function () {
                this.partial('./views/listings/details.hbs');
            });
        }).catch(notifications.handleError);


};

CONTROLLERS.createCarGetController = function (context) {
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        nav: './views/common/nav.hbs',
        footer: './views/common/footer.hbs',
    }).then(function () {
        this.partial('./views/create/createPage.hbs');
    });
};

CONTROLLERS.createCarPostController = function (context) {
    let title = context.params.title;
    let description = context.params.description;
    let brand = context.params.brand;
    let model = context.params.model;
    let year = context.params.year;
    let imageUrl = context.params.imageUrl;
    let fuelType = context.params.fuelType;
    let price = context.params.price;
    let seller = sessionStorage.getItem('username');

    console.log(year);
    console.log(year.length);
    console.log(price);

    if(checkForm(title, description, imageUrl, brand, model, fuelType, year, price, seller)){
        crudService.createCar(title, description, imageUrl, brand, model, fuelType, year, price, seller).then(res => {
            notifications.showInfo("The car was created");
            context.redirect('#/catalog');
        }).catch(notifications.handleError);
    }


};

CONTROLLERS.editCarGetController = function (context) {
    let carId = context.params.carId.slice(1);
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    crudService.loadCarDetails(carId)
        .then(function (car) {
            context.car = car;
            context.loadPartials({
                nav: './views/common/nav.hbs',
                footer: './views/common/footer.hbs',
            }).then(function () {
                this.partial('./views/edit/editPage.hbs');
            });

        });

};

CONTROLLERS.editCarPostController = function (context) {
    let carId = context.params.carId.slice(1);
    let title = context.params.title;
    let description = context.params.description;
    let brand = context.params.brand;
    let model = context.params.model;
    let year = context.params.year;
    let imageUrl = context.params.imageUrl;
    let fuelType = context.params.fuelType;
    let price = context.params.price;
    let seller = sessionStorage.getItem('username');

    if(checkForm(title, description, imageUrl, brand, model, fuelType, year, price, seller)){
        crudService.editCar(carId, title, description, imageUrl, brand, model, fuelType, year, price, seller).then(() => {
            notifications.showInfo(`Car successfully edited.`);
            context.redirect('#/catalog');
        }).catch(notifications.handleError);
    }

};

function checkForm(title, description, imageUrl, brand, model, fuelType, year, price, seller){
    if(title.length === 0 || title.length > 33){
        notifications.showError('Title length should not exceed 33');
    }else if(description.length < 30 || description.length > 450){
        notifications.showError('Description length should be between 30 and 450');
    }else if(brand.length === 0 || brand.length > 11){
        notifications.showError('Brand length should be not more than 11 characters');
    }else if(model.length < 4 || model.length > 11){
        notifications.showError('Model length should be between 4 nad 11 characters');
    }else if(fuelType.length === 0 || fuelType.length > 11){
        notifications.showError('Fuel length should be not more than 11 characters');
    }else if(!(year.length === 4) ){
        notifications.showError('Year length should be 4 characters');
    }else if(price === null || price === 'undefined' || price === '' || price > 1000000){
        notifications.showError('Price should be up to 1 000 000 $');
    }else if(!imageUrl.startsWith('http')){
        notifications.showError('image Url should start with http');
    }else{
        return true;
    }

    return false;
}

CONTROLLERS.deleteCarGetController = function (context) {
    let carId = context.params.carId.slice(1);
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    crudService.deleteCar(carId)
        .then(function () {
        notifications.showInfo("The car was deleted");
        context.redirect('#/catalog');

    }).catch(notifications.handleError);

};

CONTROLLERS.myCarsGetController = function (context) {
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    crudService.loadMyCars(context.username).then(res => {

        context.cars = res;

        console.log(context.cars);

        notifications.showInfo('Cars listed.');
        context.loadPartials({
            nav: './views/common/nav.hbs',
            footer: './views/common/footer.hbs',
            mycar: './views/mylistings/mycar.hbs'
        }).then(function () {
            this.partial('./views/mylistings/mylistingsPage.hbs');
        });

    }).catch(notifications.handleError);


}

