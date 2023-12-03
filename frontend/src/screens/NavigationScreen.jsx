export default function NavigationScreen() {
  function hamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach((n) =>
      n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      })
    );
  }
  return (
    <div className="container">
      <nav className="navbar">
        <a href="/" className="nav-branding">
          Video.
        </a>

        <ul className="nav-menu">
          <li>
            <form className="formSearch">
              <input className="search" />
              <button className="btn btn-info">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/videoAdd" className="nav-link">
              Add Video
            </a>
          </li>
          <li className="nav-item">
            <a href="#categories" className="nav-link">
              Categories
            </a>
          </li>
          <li className="nav-item">
            <a href="#dashboard" className="nav-link">
              Dashboard
            </a>
          </li>
        </ul>

        <div className="hamburger" onClick={hamburgerMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </div>
  );
}
