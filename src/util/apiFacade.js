const URL = 'http://localhost:7070/api/v1/';
const AUTHENTICATION_ROUTE = 'auth/login';

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem('jwtToken', token);
  };

  const getToken = () => {
    return localStorage.getItem('jwtToken');
  };

  const logout = (callback) => {
    localStorage.removeItem('jwtToken');
    callback(true);
  };

  const handleHttpErrors = (res) => {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  };

    const login = async (username, password) => {
      const payload = { username, password };
      const options = makeOptions("POST", payload);
  
      try {
        const response = await fetch(URL + AUTHENTICATION_ROUTE, options);
        const json = await handleHttpErrors(response);
        setToken(json.token);
      } catch (error) {
        if (error.status) {
          error.fullError.then(e => console.error(JSON.stringify(e)));
        } else {
          console.error("Serious error:", error);
        }
        throw error; // Re-throw the error so it can be handled by the caller
      }
    };

  const fetchData = (endpoint, method, payload) => {
    const options = makeOptions(method, payload, true);
    return fetch(URL + endpoint, options).then(handleHttpErrors);
  };

  const makeOptions = (method, payload, addToken) => {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    };

    if (addToken) {
      opts.headers["Authorization"] = `Bearer ${getToken()}`;
    }

    if (payload) {
      opts.body = JSON.stringify(payload);
    }

    return opts;
  };

  const getUserRoles = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = token.split('.')[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const roles = decodedClaims.roles;
      return roles;
    } else return "";
  };

  const getUserName = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = token.split('.')[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const username = decodedClaims.username;
      return username;
    } else {
      return null;
    }
  };

  return {
    makeOptions,
    setToken,
    getToken,
    logout,
    login,
    fetchData,
    getUserRoles,
    getUserName
  };
}

const facade = apiFacade();
export default facade;
