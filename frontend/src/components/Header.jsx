function Header() {
  return (
    <header className="home-page__header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="header__content text-center">
              <h1>Recepty, které vás inspirují</h1>
              <h2>Recepty pro každý den a každou příležitost.</h2>
              <a
                href="#recipes"
                className="header__btn btn btn-lg text-uppercase"
              >
                K receptům
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
