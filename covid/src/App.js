import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Casos from "./views/casos.js";
import Vacunas from "./views/vacunas.js";
import Sobre from "./views/sobre.js";
import Contacto from "./views/contacto.js";
import R from "./views/r.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"
import {Navbar, Nav, NavDropdown} from "react-bootstrap";

function App() {
  return(
  <div>
  <header>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8277816264630890"
         crossorigin="anonymous"></script>
  </header>
  <body>
      <Router >
        <Navbar className="TopMenu"  expand="lg" >
      <Navbar.Brand as={Link} to="/">
        Casos covid
    </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
            <Nav.Link className="Top" as={Link} to="/Casos">Casos</Nav.Link>
            <Nav.Link className="Top" as={Link} to="/Vacunas">Incidencia Vacunas</Nav.Link>
            <Nav.Link className="Top" as={Link} to="/R">R efectivo</Nav.Link>
            <Nav.Link className="Top" as={Link} to="/Sobre">Sobre mí</Nav.Link>
            <Nav.Link className="Top" as={Link} to="/Contacto" >Contacto</Nav.Link>
            
          </Nav>
      </Navbar.Collapse>
    </Navbar>
        <Switch>
          <Route path="/Casos">
            <Casos />
          </Route>
          <Route path="/Vacunas">
            <Vacunas />
          </Route>
          <Route path="/R">
            <R />
          </Route>
          <Route path="/Sobre">
            <Sobre />
          </Route>
          <Route path="/Contacto">
            <Contacto />
          </Route>
          <Route path="/">
            <Casos />
          </Route>
        </Switch>
      </Router>
      </body>
      </div>
  );
}

export default App;
