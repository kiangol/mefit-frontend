import './AppLoading.css'

const AppLoading = () => {
    return (
        <div className="AppLoading">
            <div className="lds-heart">
                <div></div>
            </div>
            <p>Loading...</p>
        </div>
    )
};
export default AppLoading;

/**
 * This can be customised to show anything while Keycloak is initialising.
 */
