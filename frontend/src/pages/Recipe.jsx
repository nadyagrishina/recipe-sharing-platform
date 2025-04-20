import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import DefaultImage from "../images/default-recipe.jpg";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        setError("Chyba při načítání receptu.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/comments/${id}`)
        .then((res) => setComments(res.data))
        .catch((err) => console.error("Chyba při načítání komentářů:", err));
    }
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const commentData = {
      username: currentUser?.username || "Anonym",
      text: newComment.trim(),
      recipeId: Number(id),
    };

    axios
      .post("${process.env.REACT_APP_API_URL}/api/comments", commentData)
      .then((res) => {
        setComments((prev) => [...prev, res.data]);
        setNewComment("");
      })
      .catch((err) => {
        alert("Nepodařilo se přidat komentář.");
        console.error(err);
      });
  };

  if (loading) return <p>Načítání...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Recept nebyl nalezen.</p>;

  return (
    <div className="page-content">
      <HeaderMenu />
      <section className="single__recipe">
        <div className="container">
          <div className="single__recipe-content">
            <div className="row">
              <div className="col-xl-5 col-md-6 col-sm-12">
                <img
                  src={
                    recipe.imagePath
                      ? `http://localhost:8080${recipe.imagePath}`
                      : DefaultImage
                  }
                  className="card-img-top img-fluid"
                  alt={recipe.name}
                />
              </div>

              <div className="col-xl-7 col-md-6 col-sm-12">
                <div className="card-body">
                  <h3 className="card-title mt-3">{recipe.name}</h3>
                  <p className="text-muted">{recipe.description}</p>

                  <h4>Suroviny</h4>
                  <ul>
                    {recipe.ingredients.split(", ").map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <h5 className="mb-0 mt-3">Autor:</h5>
            <p>{recipe.creator}</p>

            <h4 className="recipe__steps">Postup přípravy</h4>
            <ol>
              {recipe.instructions
                .split(".")
                .map((step) => step.trim())
                .filter((step) => step.length > 0)
                .map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
            </ol>

            <h4>Kategorie</h4>
            <div className="d-flex flex-wrap gap-2">
              {recipe.categories.map((cat, index) => (
                <button
                  key={index}
                  type="button"
                  className="btn btn-sm"
                  disabled
                >
                  {cat}
                </button>
              ))}
            </div>

            <h4>Komentáře</h4>
            <div className="recipe__comments">
              <ul className="list-group mb-3">
                {comments.map((c, i) => (
                  <li key={i} className="list-group-item py-2 px-3">
                    <strong>{c.username}</strong>: {c.text}
                  </li>
                ))}
              </ul>

              {currentUser && (
                <>
                  <input
                    type="text"
                    className="form-control"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Napište komentář..."
                  />
                  <button
                    className="btn btn-primary mt-2 comment-btn"
                    onClick={handleAddComment}
                  >
                    Přidat komentář
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipePage;
