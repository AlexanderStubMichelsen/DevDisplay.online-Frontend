
const URL = 'http://localhost:7070/api/v1/'
const PICTURE_ROUTE = "pictures"
const AUTHENTICATION_ROUTE = 'auth/login'

function apiFacade()
{

    const setToken = (token) =>
    {
        localStorage.setItem('jwtToken', token)
    }

    const getToken = () =>
    {
        return localStorage.getItem('jwtToken')
    }

    const logout = (callback) =>
    {
        localStorage.removeItem('jwtToken')
        callback(true)
    }

    const handleHttpErrors = (res) =>
    {
        if (!res.ok)
        {
            return Promise.reject({ status: res.status, fullError: res.json() })
        }
        return res.json()
    }

    const login = (user, password, callback) =>
    {
        console.log("Jeg er fanget inde i login funktionen", user, password)

        const payload = { username: user, password: password }

        const options = makeOptions("POST", payload)

        return fetch(URL + AUTHENTICATION_ROUTE, options)
            .then(handleHttpErrors)
            .then((json) =>
            {
                callback(true)
                setToken(json.token)
            })
            .catch((error) =>
            {
                if (error.status)
                {
                    error.fullError.then(e => console.log(JSON.stringify(e)))
                } else
                {
                    console.log("seriøs fejl", error)
                }
            })
    }

    const register = (user, password, role, callback) =>
    {
        console.log("Jeg er fanget inde i register funktion, user:", user, "password:", password)

        const payload = { username: user, password: password, role: role}

        const options = makeOptions("POST", payload)

        return fetch(URL + "auth/register", options)
            .then(handleHttpErrors)
            .then((json) =>
            {
                callback(true)
                setToken(json.token)
            })
            .catch((error) =>
            {
                if (error.status)
                {
                    error.fullError.then(e => console.log(JSON.stringify(e)))
                } else
                {
                    console.log("seriøs fejl", error)
                }
            })
    }
        

    const fetchData = (endpoint, method, payload) =>
    {
        const options = makeOptions(method, payload, true); //True add's the token
        return fetch(URL + endpoint, options).then(handleHttpErrors);
    }

    const makeOptions = (method, payload, addToken) =>
    {

        const opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        }

        if (addToken)
        {
            opts.headers["Authorization"] = `Bearer ${getToken()}`
        }

        if (payload)
        {
            opts.body = JSON.stringify(payload)
        }

        return opts;
    }

    const getUserRoles = () =>
    {
        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) =>
    {
        const roles = getUserRoles().split(',')
        return loggedIn && roles.includes(neededRole)
    }

    const getUserName = () => {
        const token = getToken();
        if (token != null) {
            const payloadBase64 = token.split('.')[1];
            const decodedClaims = JSON.parse(window.atob(payloadBase64));
            const username = decodedClaims.username; // Assuming username is in the JWT payload
            return username;
        } else {
            return null; // No token found or token is invalid
        }
    }

    return {
        makeOptions,
        setToken,
        getToken,
        logout,
        login,
        register,
        getUserRoles,
        hasUserAccess,
        fetchData,
        getUserName,
    }

}

const facade = apiFacade();
export default facade;
