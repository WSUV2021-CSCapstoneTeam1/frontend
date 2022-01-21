import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import { Component } from 'react';

import SiteFlowProductList from "./pages/SiteFlowProductList";
import SiteFlowTemplateList from "./pages/SiteFlowTemplateList";
import LocalTemplateList from './pages/LocalTemplateList';
import AddLocalTemplateView from "./pages/AddLocalTemplateView";
import SiteFlowSKUList from "./pages/SiteFlowSKUList";
import AddSiteFlowSKUView from "./pages/AddSiteFlowSKUView";


class RootPage extends Component {
  constructor(props) {
    super(props);
    this.state = { id: 0 };
  }

  render() {
    return (
      <Router>
      <div>

        {/* Navigation bar */}
        <nav className="navbar fw-bold navbar-light bg-light navbar-expand-md">
            <a href="/" className="navbar-brand">Factory Configurator</a>
            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbar">
              <ul className="navbar-nav">
                    <li className="nav-item fw-light"><a href="/siteflow/products" className="nav-link">Site Flow Products</a></li>
                    <li className="nav-item fw-light"><a href="/siteflow/sku" className="nav-link">Site Flow SKUs</a></li>
                    <li className="nav-item fw-light"><a href="/siteflow/templates" className="nav-link">Site Flow Templates</a></li>
                    <li className="nav-item fw-light"><a href="/local/templates" className="nav-link">Local Templates</a></li>
                </ul>
            </div>
        </nav>

          {/* React switches */}
        <div className="container mt-3">
            <Switch>
              <Route path="/siteflow/products" component={SiteFlowProductList} />
              <Route path="/siteflow/sku" component={SiteFlowSKUList} />
              <Route path="/siteflow/sku/add" component={AddSiteFlowSKUView} />
              <Route path="/siteflow/templates" component={SiteFlowTemplateList} />

              {/*Testing*/}
              <Route path="/local/templates/modify/:id" component={AddLocalTemplateView} />

              {/*Testing*/}
              <Route path="/local/templates/add" component={AddLocalTemplateView} />
              <Route path="/local/templates" component={LocalTemplateList} />
              <Route path="/" component={Home} />

          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>This is the home page.</p>
    </div>
  );
}

function App() {
  return <RootPage />
}

export default App;
