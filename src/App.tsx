import { Link, Outlet, useLocation } from "react-router-dom";
import "./App.css";

const routes = [
  "/filter-with-on-change",
  "/filter-with-unique-string",
  "/filter-with-link",
];

const allowEmptyPath = {
  [routes[0]]: "/",
};

function App() {
  const { pathname } = useLocation();

  return (
    <div className="app">
      <div className="navigation">
        <span>Filters mode:</span>
        <div className="navigation-links">
          {routes.map((route) => {
            return (
              <Link
                key={route}
                to={route}
                className={
                  pathname === route || allowEmptyPath[route] === pathname
                    ? "navigation-links--active"
                    : ""
                }
              >
                {route}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
