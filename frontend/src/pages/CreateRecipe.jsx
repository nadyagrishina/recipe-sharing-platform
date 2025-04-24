import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";

const CreateRecipe = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    formData.append("name", recipe.name);
    formData.append("description", recipe.description);
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.instructions);
    formData.append("creator", user.username);
    formData.append("image", recipe.image);
    recipe.category.forEach((cat) => {
      formData.append("categories", cat);
    });

    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then(() => navigate("/profile"))
        .catch(() => alert("Chyba při odesílání."));
  };

  return (
    <div className="page-content">
      <HeaderMenu />
      <div className="container mt-4">
        <h3>Přidat nový recept</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              placeholder="Např.: mouka, vejce, cukr, mléko"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Postup</label>
            <textarea
              className="form-control"
              name="instructions"
              value={recipe.instructions}
              placeholder="Např.: Smíchejte suché ingredience. Přidejte vejce a mléko. Pečte 30 minut."
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Kategorie</label>
            {Object.entries(categoryGroups).map(([group, cats]) => (
              <div key={group} className="mb-2">
                <p>{group}</p>
                <div className="d-flex flex-wrap gap-2">
                  {cats.map((cat, i) => (
                    <button
                      type="button"
                      key={i}
                      className={`btn btn-sm ${
                        recipe.category.includes(cat)
                          ? "btn-success btn-category-success"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => {
                        const selected = recipe.category.includes(cat);
                        const updated = selected
                          ? recipe.category.filter((c) => c !== cat)
                          : [...recipe.category, cat];
                        setRecipe({ ...recipe, category: updated });
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label">Obrázek</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          <button type="submit" className="btn recipe__btn btn-success">
            Přidat recept
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
