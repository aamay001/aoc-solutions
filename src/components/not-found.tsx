import { useLocation, useNavigate } from "react-router";
import RouteLayout from "./route-layout"

const NotFound = () => {
  const location = useLocation()
  const navigate = useNavigate();

  if (location.pathname.includes('day-')) {
    const path = location.pathname;
    const day = path.substring(path.length - 1);
    navigate(`/day/${day}`)
    return null;
  }

  return (
    <RouteLayout name="404 - Not Found">
      <p>This solution is not available OR the URL you entered is invalid!</p>
    </RouteLayout>
  );
}

export default NotFound;