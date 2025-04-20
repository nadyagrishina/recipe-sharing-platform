import { useEffect, useState } from "react";
import axios from "axios";
import RecipeItem from "./RecipeItem";
import Pagination from "./Pagination";

const RecipesList = ({ selectedCategory }) => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const recipesPerPage = 8;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/recipes`)
      .then((res) => setRecipes(res.data))
      .catch(() => setError("Nepodařilo se načíst recepty"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filtered = selectedCategory
    ? recipes.filter((r) => r.categories?.includes(selectedCategory))
    : recipes;

  const total = filtered.length;
  const start = (currentPage - 1) * recipesPerPage;
  const current = filtered.slice(start, start + recipesPerPage);

  const changePage = (page) => setCurrentPage(page);

  if (loading) return <p>Načítání...</p>;
  if (error) return <p>{error}</p>;
  if (total === 0) return <p>Žádné recepty nebyly nalezeny.</p>;

  return (
    <>
      <div className="row">
        {current.map((recipe) => (
          <div
            key={recipe.id}
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4"
          >
            <RecipeItem
              id={recipe.id}
              imgSrc={`${process.env.REACT_APP_API_URL}${recipe.imagePath}`}
              altText={recipe.name}
              title={recipe.name}
              description={recipe.description}
            />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={total}
        itemsPerPage={recipesPerPage}
        onPageChange={changePage}
      />
    </>
  );
};

export default RecipesList;
