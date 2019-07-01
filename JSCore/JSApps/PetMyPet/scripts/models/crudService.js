let crudService = (() => {
    const APPDATA_MODULE = 'appdata';
    const AUTH = 'kinvey';
    const ENTITY = 'pets/';
    const ENTITYQ = 'pets';

    function loadPets() {
        // return requester.get(APPDATA_MODULE, ENTITYQ+'?query={"isPublic":true}', AUTH);
        return requester.get(APPDATA_MODULE, ENTITYQ+'?query={}&sort={"likes": -1}', AUTH);
    }

    function loadMyPets(userId) {
        return requester.get(APPDATA_MODULE, ENTITYQ+`?query={"_acl.creator":"${userId}"}`, AUTH);
    }

    function loadPetDetails(petId) {
        return requester.get(APPDATA_MODULE, ENTITY + petId, AUTH);
    }


    function editPet(petId, name, description, imageURL, category, likes) {
        let PetData = {
            name,
            description,
            imageURL,
            category,
            likes
        };

        return requester.update(APPDATA_MODULE, ENTITY + petId, AUTH, PetData);
    }

    function createPet(name, description, imageURL, category) {
        let PetData = {
            name,
            description,
            imageURL,
            category,
            likes: 0
        };

        return requester.post(APPDATA_MODULE, ENTITY, AUTH, PetData);
    }

    function deletePet(petId) {
        return requester.remove(APPDATA_MODULE, ENTITY + petId, AUTH);
    }



    return {
        loadPets,
        loadMyPets,
        loadPetDetails,
        editPet,
        createPet,
        deletePet
    };
})();