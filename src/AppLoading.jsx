import './AppLoading.css'


const AppLoading = () => {
    return (
        <div className="AppLoading">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>Application initialising...</p>
        </div>

    )
};
export default AppLoading;

/**
 * This can be customised to show anything while Keycloak is initialising.
 */
