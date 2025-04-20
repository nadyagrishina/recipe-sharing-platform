import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";

const EditRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    instructions: "",
    category: [],
    image: null,
  });

  const categoryGroups = {
    "Styl a dieta": [
      "Jednoduché",
      "Rychlé recepty",
      "Pro vegetariány",
      "Pro vegany",
      "Zdravé stravování",
      "Pro děti",
    ],
    Tematické: [
      "Tematické recepty",
      "Na svátky",
      "Vánoce",
      "Velikonoce",
      "Grilování",
      "Narozeniny",
      "Masopust",
    ],
    "Hlavní ingredience": [
      "Maso",
      "Těstoviny",
      "Mořské plody",
      "Zelenina",
      "Ryby",
      "Drůbež",
      "Luštěniny",
      "Tvaroh",
    ],
    "Typ jídla": [
      "Polévky",
      "Omáčky",
      "Hlavní jídla",
      "Předkrmy",
      "Pečivo",
      "Saláty",
      "Snídaně",
      "Dezerty",
      "Slané pečivo",
      "Palačinky",
      "Nápoje",
    ],
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe({
          name: data.name,
          description: data.description,
          ingredients: data.ingredients,
          instructions: data.instructions,
          category: data.categories,
          image: null,
        });
      })
      .catch((err) => {
        console.error("Chyba při načítání receptu:", err);
        alert("Nepodařilo se načíst recept.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryClick = (cat) => {
    const updated = recipe.category.includes(cat)
      ? recipe.category.filter((c) => c !== cat)
      : [...recipe.category, cat];
    setRecipe({ ...recipe, category: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    const updatedData = {
      ...recipe,
      creator: user.username,
      categories: recipe.category,
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Chyba při aktualizaci receptu.");
        return res.json();
      })
      .then(() => {
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Chyba při odesílání:", err);
        alert("Nepodařilo se aktualizovat recept.");
      });
  };

  return (
    <div className="page-content">
      <HeaderMenu />
      <div className="container mt-4">
        <h3>Upravit recept</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Název</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Popis</label>
            <textarea
              className="form-control"
              name="description"
              value={recipe.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ingredience</label>
            <textarea
              className="form-control"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Instrukce</label>
            <textarea
              className="form-control"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Kategorie</label>
            {Object.entries(categoryGroups).map(
              ([groupName, groupCategories]) => (
                <div key={groupName} className="mb-2">
                  <p>{groupName}</p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {groupCategories.map((cat, index) => {
                      const selected = recipe.category.includes(cat);
                      return (
                        <button
                          type="button"
                          key={index}
                          className={`btn btn-sm btn-category ${
                            selected
                              ? "btn-success btn-category-success"
                              : "btn-outline-secondary"
                          }`}
                          onClick={() => handleCategoryClick(cat)}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>

          <button type="submit" className="btn btn-success recipe__btn">
            Uložit změny
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
