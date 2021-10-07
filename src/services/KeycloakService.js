import Keycloak from "keycloak-js";

const _keycloak = new Keycloak("keycloak.json");

/**
 * Initialise Keycloak
 * @param {function} onAuthenticated
 */
const initKeycloak = onAuthenticated => {
    _keycloak
        .init({
            onLoad: "check-sso",
            silentCheckSsoRedirectUri:
                window.location.origin + "/silent-check-sso.html",
            pkceMethod: "S256",
        })
        .then(onAuthenticated)
        .catch(() =>{
            console.log('here');
        })
};

/**
 * Execute Keycloak Login
 */
const doLogin = _keycloak.login;

/**
 * Execute Keycloak Logout.
 */
const doLogout = _keycloak.logout;

/**
 * Get the current token
 * @returns string | undefined
 */
const getToken = () => _keycloak.token;

/**
 * Check for an existing session
 * @returns boolean
 */
const isLoggedIn = () => !!_keycloak.token;

/**
 * Update the token
 * @param {function} successCallback
 * @returns void
 */
const updateToken = (successCallback) =>
    _keycloak.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

/**
 * Get the current users' username
 * @returns string | undefined
 */
const getUsername = () => _keycloak.tokenParsed?.preferred_username;

/**
 * Check if user has any of the given roles
 * @param {Array<string>} roles
 * @returns boolean
 */
const hasRole = (roles) => roles.some((role) => _keycloak.hasRealmRole(role));

const KeycloakService = {
    initKeycloak,
    doLogin,
    doLogout,
    getToken,
    isLoggedIn,
    updateToken,
    getUsername,
    hasRole,
};

export default KeycloakService

/**
 * Special thanks to Niko Köbler for his tutorial on React with keycloak
 * Source code: https://github.com/dasniko/keycloak-reactjs-demo
 */