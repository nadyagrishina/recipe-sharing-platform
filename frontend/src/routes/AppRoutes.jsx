
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Recipe from "../pages/Recipe";
import Login from "../pages/Login";
import Register from '../pages/Register';
import Profile from "../pages/Profile";
import CreateRecipe from "../pages/CreateRecipe";
import EditRecipe from "../pages/EditRecipe";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
