import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

function ProtectedRoute({ children, ...rest }: ProtectedRoute) {
  const [cookies] = useCookies(["token"]);
  // const { accessToken } = useCookies();
  console.log(cookies);

  return cookies.token ? <>{children}</> : <Navigate to="/" {...rest} />;
}

export default ProtectedRoute;
