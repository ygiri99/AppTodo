import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-info shadow-sm">
      <div className="container py-2">
        <NavLink
          className="navbar-brand d-flex align-items-center gap-2 fw-bold"
          to="/"
        >
          <img
            alt="logo"
            src="/lo.jpg"
            className="rounded-circle"
            style={{
              height: 40,
              width: 40,
            }}
          />
          Todo App
        </NavLink>
        <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
          <NavLink className="nav-link fw-semibold" to="/about">
            About
          </NavLink>
          <NavLink className="btn btn-dark px-4" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
