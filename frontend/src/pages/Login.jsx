import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      if (response.status === 200 && response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/profile");
      }
    } catch (err) {
      setError("Neplatné přihlašovací údaje.");
    }
  };

  return (
    <div className="page-content">
      <HeaderMenu />
      <div className="container">
        <div className="login-wrapper d-flex justify-content-center">
          <div className="login-container">
            <h2 className="text-center">Přihlášení</h2>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Uživatelské jméno</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  placeholder="Zadejte uživatelské jméno"
                  required
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="password">Heslo</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Zadejte heslo"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mt-4"
                disabled={!username || !password}
              >
                Přihlásit se
              </button>
            </form>

            {error && <div className="text-danger mt-3">{error}</div>}

            <div className="mt-3 text-center">
              <p>
                Nemáte účet?{" "}
                <a href="/register" className="btn btn-link p-0">
                  Zaregistrujte se
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
