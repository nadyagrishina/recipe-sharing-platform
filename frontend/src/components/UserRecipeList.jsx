/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RecipeItem from "./Recipes/RecipeItem";

const UserRecipesList = ({ username }) => {
  const [recipes, setRecipes] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (username) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/recipes/user/${username}`)
        .then((res) => {
          setRecipes(res.data);
          setDashboard(getDashboardData(res.data));
          setLoading(false);
        })
        .catch(() => {
          setError("Nepodařilo se načíst recepty");
          setLoading(false);
        });
    }
  }, [username]);

  const getDashboardData = (recipes) => {
    const total = recipes.length;

    const categories = recipes.flatMap((r) => r.categories || []);
    const categoryCount = {};
    categories.forEach((c) => {
      categoryCount[c] = (categoryCount[c] || 0) + 1;
    });

    const topCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => `${name} (${count})`);

    const recent = [...recipes]
      .sort((a, b) => b.id - a.id)
      .slice(0, 3)
      .map((r) => r.name);

    return { total, topCategories, recent };
  };

  const handleDelete = (id) => {
    if (window.confirm("Opravdu chcete smazat tento recept?")) {
      fetch(`http://localhost:8080/api/recipes/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error();
          const updated = recipes.filter((r) => r.id !== id);
          setRecipes(updated);
          setDashboard(getDashboardData(updated));
        })
        .catch(() => {
          alert("Chyba při mazání.");
        });
    }
  };

  if (loading) return <p>Načítání receptů...</p>;
  if (error) return <p>{error}</p>;
  if (recipes.length === 0) return <p>Uživatel zatím nemá žádné recepty.</p>;

  return (
    <>
      {dashboard && (
        <div className="dashboard-box mb-4">
          <h5>📊 Přehled</h5>
          <p>
            <strong>Celkem receptů:</strong> {dashboard.total}
          </p>
          <p>
            <strong>Top kategorie:</strong> {dashboard.topCategories.join(", ")}
          </p>
          <p>
            <strong>Poslední recepty:</strong> {dashboard.recent.join(", ")}
          </p>
        </div>
      )}

      <div className="row">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4 d-flex flex-column"
          >
            <RecipeItem
              id={recipe.id}
              imgSrc={`http://localhost:8080${recipe.imagePath}`}
              altText={recipe.name}
              title={recipe.name}
              description={recipe.description}
            />
            <div className="d-flex gap-2 mt-2">
              <Link
                to={`/edit/${recipe.id}`}
                className="btn btn-outline-primary btn-sm w-100"
              >
                Upravit
              </Link>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="btn btn-outline-danger btn-sm w-100"
              >
                Smazat
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserRecipesList;
