import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const HeaderMenu = () => {
  return (
    <div className="navbar-wrapper">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="">
              <MobileMenu />
            </div>
            <div className="logo-container">
              <Logo />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HeaderMenu;
