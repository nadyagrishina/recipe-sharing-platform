const RecipesCategories = ({ selectedCategory, setSelectedCategory }) => {
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

  const allCategories = Object.values(categoryGroups).flat();

  return (
    <nav className="nav gap-2 flex-wrap mt-2">
      {allCategories.map((category, i) => (
        <button
          key={i}
          className={`btn btn-sm ${
            selectedCategory === category
              ? "btn-primary btn-category-success"
              : "btn-outline-secondary"
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
};

export default RecipesCategories;
