import { Navigate } from "react-router-dom";

const ForwardingRoute = ({ children }) => {
  const token = localStorage.getItem("token"); 
  return token ? children : <Navigate to="/signIn" replace />;
};

export default ForwardingRoute;
