import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const Protectedroute = props => {
  const jwt = Cookies.get('jwt_token')
  if (jwt === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
export default Protectedroute
