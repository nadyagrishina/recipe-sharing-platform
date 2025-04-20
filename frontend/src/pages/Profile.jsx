import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import DefaultAvatar from "../images/default-avatar.jpg";
import UserRecipesList from "../components/UserRecipeList";


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);

      fetch(`${process.env.REACT_APP_API_URL}/api/recipes/user/${user.username}`)
        .then((res) => res.json())
        .catch((err) => console.error("Chyba při načítání receptů:", err));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!userData) return <p>Načítání profilu...</p>;

  return (
    <div className="page-content">
      <HeaderMenu />
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <img
              src={userData.imagePath || DefaultAvatar}
              alt="Avatar"
              className="img-fluid profile__img mt-4 mt-md-0"
            />
          </div>
          <div className="col-xl-9 col-md-6 user__info">
            <div>
              <h3 className="mt-4 mt-md-0">{userData.username}</h3>
              <p>
                <strong>E-mail:</strong> {userData.email}
              </p>
              <p>
                <strong>Datum registrace:</strong>{" "}
                {new Date(userData.registrationDate).toLocaleDateString()}
              </p>
            </div>
            <Link
              to="/create-recipe"
              className="btn btn-primary btn__add-recipe"
            >
              Přidat recept
            </Link>
          </div>
        </div>

        <div className="row mt-4 mb-5">
          <h3>Vaše recepty</h3>
          <UserRecipesList username={userData.username} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
