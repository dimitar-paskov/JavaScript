const CONTROLLERS = {};

$(() => {
    const APP = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/index.html', CONTROLLERS.homeController);
        this.get('#/welcome', CONTROLLERS.listPetsController);

        this.get('#/register', CONTROLLERS.registerGetController);
        this.post('#/register', CONTROLLERS.registerPostController);

        this.get('#/login', CONTROLLERS.loginGetController);
        this.post('#/login', CONTROLLERS.loginPostController);

        this.get('#/logout', CONTROLLERS.logoutController);

        this.get('#/catalog/all', CONTROLLERS.listPetsController); //dashboardAll
        this.get('#/catalog/cats', CONTROLLERS.listPetsControllerCats); //dashboard
        this.get('#/catalog/dogs', CONTROLLERS.listPetsControllerDogs); //dashboard
        this.get('#/catalog/parrots', CONTROLLERS.listPetsControllerParrots); //dashboard
        this.get('#/catalog/reptiles', CONTROLLERS.listPetsControllerReptiles); //dashboard
        this.get('#/catalog/others', CONTROLLERS.listPetsControllerOthers); //dashboard
        this.get('#/catalog/:petId', CONTROLLERS.petDetailsGetController);

        this.get('#/create', CONTROLLERS.createPetGetController);
        this.post('#/create', CONTROLLERS.createPetPostController);

        this.get('#/edit/:petId', CONTROLLERS.editPetGetController);
        this.get('#/edit/myPet/:petId', CONTROLLERS.editMyPetGetController);
        this.post('#/edit/:petId', CONTROLLERS.editPetPostController);

        this.get('#/delete/:petId', CONTROLLERS.deletePetGetController);
        this.post('#/delete/:petId', CONTROLLERS.deletePetPostController);

        this.get('#/myPets', CONTROLLERS.myPetsGetController);

        this.get('#/pet/:petId', CONTROLLERS.petMyPetGetController);
        this.get('#/pet/details/:petId', CONTROLLERS.petDetailsMyPetGetController);

        //TODO da disable buttons for consecutive press



        // this.get("", function () {
        //     this.app.runRoute("get", "#home");
        // });

    });

    APP.run('#/index.html');
});