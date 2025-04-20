import { useState } from "react";
import RecipesCategories from "./RecipesCategories";
import AllCategoriesButton from "./AllCategoriesButton";
import RecipesList from "./RecipesList";

const Recipes = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <section className="recipes" id="recipes">
      <div className="container">
        <h3 className="mb-4">Recepty</h3>

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <AllCategoriesButton setSelectedCategory={setSelectedCategory} />
            <RecipesCategories
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>

        <RecipesList selectedCategory={selectedCategory} />
      </div>
    </section>
  );
};

export default Recipes;
