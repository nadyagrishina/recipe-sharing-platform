import { Link } from "react-router-dom";

const RecipeItem = ({ id, imgSrc, altText, title, description }) => {
  return (
    <div className="recipe-card">
      <img src={imgSrc} className="card-img-top" alt={altText} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <Link to={`/recipe/${id}`} className="btn btn-primary">
          Zobrazit recept
        </Link>
      </div>
    </div>
  );
};


export default RecipeItem;
