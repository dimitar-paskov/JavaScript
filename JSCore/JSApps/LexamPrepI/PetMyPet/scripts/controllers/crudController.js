CONTROLLERS.listPetsController = function (context) {
    crudService.loadPets().then(res => {
        context.loggedIn = authService.isAuth();
        context.username = sessionStorage.getItem('username');
        context.Pets = res.filter(x=>{
            return x._acl.creator !== sessionStorage.getItem('userId');
        });

        console.log(context.Pets);

        context.loadPartials({
            nav: './views/common/nav.hbs',
            footer: './views/common/footer.hbs',
            Pet: './views/listings/pet.hbs'
        }).then(function () {
            this.partial('./views/listings/dashboardPage.hbs');
            notifications.showInfo('Pets listing.');
        });

    }).catch(notifications.handleError);
};

CONTROLLERS.listPetsControllerCats = function (context) {
    crudService.loadPets().then(res => {
        context.loggedIn = authService.isAuth();
        context.username = sessionStorage.getItem('username');
        context.Pets = res.filter(x=>{
            return (x._acl.creator !== sessionStorage.getItem('userId') && x.category === 'Cat');
        });

        console.log(context.Pets);

        context.loadPartials({
            nav: './views/common/nav.hbs',
            footer: './views/common/footer.hbs',
            Pet: './views/listings/pet.hbs'
        }).then(function () {
            this.partial('./views/listings/dashboardPage.hbs');
            notifications.showInfo('Pets listing.');
        });

    }).catch(notifications.handleError);
};

CONTROLLERS.listPetsControllerDogs = function (context) {
    crudService.loadPets().then(res => {
        context.loggedIn = authService.isAuth();
        context.username = sessionStorage.getItem('username');
        context.Pets = res.filter(x=>{
            return (x._acl.creator !== sessionStorage.getItem('userId') && x.category === 'Dog');
        });

        console.log(context.Pets);

        context.loadPartials({
            nav: './views/common/nav.hbs',
            footer: './views/common/footer.hbs',
            Pet: './views/listings/pet.hbs'
        }).then(function () {
            this.partial('./views/listings/dashboardPage.hbs');
            notifications.showInfo('Pets listing.');
        });

    }).catch(notifications.handleError);
};

CONTROLLERS.listPetsControllerParrots = function (context) {
    crudService.loadPets().then(res => {
        context.loggedIn = authService.isAuth();
        context.username = sessionStorage.getItem('username');
        context.Pets = res.filter(x=>{
            return (x._acl.creator !== sessionStorage.getItem('userId') && x.category === 'Parrot');
        });

        console.log(context.Pets);

        context.loadPartials({
            nav: './views/common/nav.hbs',
            footer: './views/common/footer.hbs',
            Pet: './views/listings/pet.hbs'
        }).then(function () {
            this.partial('./views/listings/dashboardPage.hbs');
            notifications.showInfo('Pets listing.');
        });

    }).catch(notifications.handleError);
};

CONTROLLERS.listPetsControllerReptiles = function (context) {
    crudService.loadPets().then(res => {
        context.loggedIn = authService.isAuth();
        context.username = sessionStorage.getItem('username');
        context.Pets = res.filter(x=>{
            return (x._acl.creator !== sessionStorage.getItem('userId') && x.category === 'Reptile');
        });

        console.log(context.Pets);

        context.loadPartials({
            nav: './views/common/nav.hbs',
            footer: './views/common/footer.hbs',
            Pet: './views/listings/pet.hbs'
        }).then(function () {
            this.partial('./views/listings/dashboardPage.hbs');
            notifications.showInfo('Pets listing.');
        });

    }).catch(notifications.handleError);
};

CONTROLLERS.listPetsControllerOthers = function (context) {
    crudService.loadPets().then(res => {
        context.loggedIn = authService.isAuth();
        context.username = sessionStorage.getItem('username');
        context.Pets = res.filter(x=>{
            return (x._acl.creator !== sessionStorage.getItem('userId') && x.category === 'Other');
        });

        console.log(context.Pets);

        context.loadPartials({
            nav: './views/common/nav.hbs',
            footer: './views/common/footer.hbs',
            Pet: './views/listings/pet.hbs'
        }).then(function () {
            this.partial('./views/listings/dashboardPage.hbs');
            notifications.showInfo('Pets listing.');
        });

    }).catch(notifications.handleError);
};



CONTROLLERS.petDetailsGetController = function (context) {
    let petId = context.params.petId.slice(1);
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    crudService.loadPetDetails(petId)
        .then(function (pet) {
            console.log(pet._acl.creator);
            console.log(sessionStorage.getItem('userId'));

            pet.isAuthor = (pet._acl.creator === sessionStorage.getItem('userId'));
            context.pet = pet;

            console.log(context.pet);
            context.loadPartials({
                nav: './views/common/nav.hbs',
                footer: './views/common/footer.hbs',
            }).then(function () {
                this.partial('./views/listings/details.hbs');
                notifications.showInfo(`Details listed.`);
            });
        }).catch(notifications.handleError);


};

CONTROLLERS.createPetGetController = function (context) {
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        nav: './views/common/nav.hbs',
        footer: './views/common/footer.hbs',
    }).then(function () {
        this.partial('./views/create/createPage.hbs');
    });
};

CONTROLLERS.createPetPostController = function (context) {
    console.log(context.params);
    let name = context.params.name;
    let description = context.params.description;
    let imageURL = context.params.imageURL;
    let category = context.params.category;



    crudService.createPet(name, description, imageURL, category)
        .then(res => {
            notifications.showInfo("Pet created.");
            context.redirect('#/welcome');
        }).catch(notifications.handleError);



};

CONTROLLERS.editPetGetController = function (context) {
    let petId = context.params.petId.slice(1);
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    crudService.loadPetDetails(petId)
        .then(function (pet) {
            context.pet = pet;
            context.loadPartials({
                nav: './views/common/nav.hbs',
                footer: './views/common/footer.hbs',
            }).then(function () {
                this.partial('./views/edit/editPage.hbs');
            });

        });

};



CONTROLLERS.editPetPostController = function (context) {

    console.log(context.params);
    let petId = context.params.petId.slice(1);
    let description = context.params.description;

    crudService.loadPetDetails(petId)
        .then(function (pet) {
            context.pet = pet;
            let name = pet.name;
            let imageURL = pet.imageURL;
            let category = pet.category;
            console.log('Inside editPetPostController');

            crudService.editPet(petId, name, description, imageURL, category)
                .then(() => {
                    notifications.showInfo(`Updated successfully!`);
                    context.redirect(`#/catalog/all`);
                }).catch(notifications.handleError);
        });


};


CONTROLLERS.deletePetGetController = function (context) {
    let petId = context.params.petId.slice(1);
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    crudService.loadPetDetails(petId)
        .then(function (pet) {
            context.pet = pet;
            context.loadPartials({
                nav: './views/common/nav.hbs',
                footer: './views/common/footer.hbs',
            }).then(function () {
                this.partial('./views/delete/deleteMyPetPage.hbs');
            });

        });

};

CONTROLLERS.deletePetPostController = function (context) {

    console.log(context.params);
    let petId = context.params.petId.slice(1);

    console.log(petId);


    crudService.deletePet(petId)
        .then(function () {
            notifications.showInfo("Pet removed successfully!");
            context.redirect('#/catalog/all');

        });


};

CONTROLLERS.myPetsGetController = function (context) {
    context.loggedIn = authService.isAuth();
    context.userId = sessionStorage.getItem('userId');

    crudService.loadMyPets(context.userId).then(res => {

        context.pets = res;

        console.log(context.pets);


        context.loadPartials({
            nav: './views/common/nav.hbs',
            footer: './views/common/footer.hbs',
            myPet: './views/mylistings/myPet.hbs'
        }).then(function () {
            this.partial('./views/mylistings/myPetsPage.hbs');
            notifications.showInfo('Pets listed.');
        });

    }).catch(notifications.handleError);


};

CONTROLLERS.petMyPetGetController = function (context) {
    let petId = context.params.petId.slice(1);
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    crudService.loadPetDetails(petId)
        .then(function (pet) {
            context.pet = pet;

            console.log(context.pet);
            context.pet.likes = +context.pet.likes + 1;
            console.log(context.pet);

            let name = context.pet.name;
            let description = context.pet.description;
            let imageURL = context.pet.imageURL;
            let category = context.pet.category;
            let likes = context.pet.likes;


            crudService.editPet(petId, name, description, imageURL, category, likes)
                .then(() => {
                    context.redirect(`#/catalog/all`);
                }).catch(notifications.handleError);
        });

}


CONTROLLERS.petDetailsMyPetGetController = function (context) {
    let petId = context.params.petId.slice(1);
    context.loggedIn = authService.isAuth();
    context.username = sessionStorage.getItem('username');

    crudService.loadPetDetails(petId)
        .then(function (pet) {
            context.pet = pet;

            console.log(context.pet);
            context.pet.likes = +context.pet.likes + 1;
            console.log(context.pet);

            let name = context.pet.name;
            let description = context.pet.description;
            let imageURL = context.pet.imageURL;
            let category = context.pet.category;
            let likes = context.pet.likes;


            crudService.editPet(petId, name, description, imageURL, category, likes)
                .then(() => {
                    context.redirect(`#/catalog/:${petId}`);
                }).catch(notifications.handleError);
        });
}
