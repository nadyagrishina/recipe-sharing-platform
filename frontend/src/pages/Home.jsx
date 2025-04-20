import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import Header from "../components/Header";
import Categories from "../components/HeaderText";
import Recipes from "../components/Recipes/Recipes";

const Home = () => {
  return (
    <div className="page-content">
      <div className="body-wrapper">
        <HeaderMenu />
        <Header />
        <Categories />
        <Recipes />
      </div>
    </div>
  );
};

export default Home;
