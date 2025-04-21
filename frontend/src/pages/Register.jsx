import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        username,
        email,
        password
      });

      const loginRes = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        username,
        password,
      });

      const token = loginRes.data.token;

      const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/user/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userRes.data));

      navigate("/profile");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Registrace selhala.");
      } else {
        setError("Něco se pokazilo. Zkuste to prosím znovu.");
      }
    }
  };

  return (
    <div className="page-content">
      <HeaderMenu />
      <div className="container">
        <div className="login-wrapper d-flex justify-content-center">
          <div className="login-container">
            <h2 className="text-center">Registrace</h2>

            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleRegister}>
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
                  minLength={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Zadejte e-mail"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Heslo</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Zadejte heslo"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                disabled={!username || !email || !password}
              >
                Zaregistrovat se
              </button>
            </form>

            <div className="mt-3 text-center">
              <p>
                Máte už účet?{" "}
                <a href="/login" className="btn btn-link p-0">
                  Přihlásit se
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
