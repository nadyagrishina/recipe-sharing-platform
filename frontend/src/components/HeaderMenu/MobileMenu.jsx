import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const MobileMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="mobile__menu">
      <button
        className="navbar-toggler mobile__navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Domů
          </Link>

          {user ? (
            <>
              <Link className="nav-link" to="/profile">
                Můj profil
              </Link>
              <button className="nav-link btn btn-link" onClick={handleLogout}>
                Odhlásit se
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Přihlášení
              </Link>
              <Link className="nav-link" to="/register">
                Registrace
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
