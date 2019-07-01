let authService = (() => {
    const MODULEUSER = 'user';
    const BASIC_AUTH = 'basic';
    const KINVEY_AUTH = 'kinvey';
    const LOGIN = 'login';
    const LOGOUT = '_logout';


    function isAuth() {
        return sessionStorage.getItem('authToken') !== null;
    }


    function getUserId() {
        return sessionStorage.getItem('userId');
    }

    function saveSession(res) {
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('authToken', res._kmd.authtoken);
        sessionStorage.setItem('userId', res._id);

    }

    function clearSession() {
        sessionStorage.clear();
    }

    function register(username, password) {
        let body = {username: username, password: password};
        return requester.post(MODULEUSER, '', BASIC_AUTH, body);
    }

    function login(username, password) {
        let body = {username: username, password: password};
        return requester.post(MODULEUSER, LOGIN, BASIC_AUTH, body);
    }

    function logout() {
        return requester.post(MODULEUSER, LOGOUT, KINVEY_AUTH, {});
    }

    return {
        isAuth,
        getUserId,
        saveSession,
        clearSession,
        register,
        login,
        logout
    };
})();