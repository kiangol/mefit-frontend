import { Redirect } from 'react-router-dom'
import KeycloakService from '../services/KeycloakService'

const withKeycloak = Component => props => {

    const isLoggedIn = KeycloakService.isLoggedIn()

    if (isLoggedIn) {
        return <Component {...props} />
    } else {
        return <Redirect to="/login" />
    }

}
export default withKeycloak;