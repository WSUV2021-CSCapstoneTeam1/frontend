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
import AddSiteFlowOrderView from "./pages/AddSiteFlowOrderView";


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
        <nav className="navbar fw-bold navbar-light bg-light navbar-expand-sm">
            <a href="/" className="navbar-brand">Factory Configurator</a>
            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbar">
              <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                            <button type="button" className="btn dropdown-toggle" id="navbarDropdown" data-toggle="dropdown">
                              Site Flow
                            </button>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                              <a className="dropdown-item fw-light" href="/siteflow/products">Products</a>
                              <a className="dropdown-item fw-light" href="/siteflow/sku">SKUs</a>
                              <a className="dropdown-item fw-light" href="/siteflow/templates">Templates</a>
                              <a className="dropdown-item fw-light" href="/siteflow/order">Order</a>
                            </div>
                    </li>
                    <li className="nav-item dropdown">
                            <button type="button" className="btn dropdown-toggle" id="navbarDropdown" data-toggle="dropdown">
                              Local
                            </button>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                              <a className="dropdown-item fw-light" href="/local/templates">Templates</a>
                            </div>
                    </li>
                </ul>
            </div>
        </nav>

          {/* React switches */}
        <div className="container mt-3">
            <Switch>
              <Route path="/siteflow/products" component={SiteFlowProductList} />
              <Route path="/siteflow/sku/add" component={AddSiteFlowSKUView} />
              <Route path="/siteflow/sku" component={SiteFlowSKUList} />
              <Route path="/siteflow/templates" component={SiteFlowTemplateList} />
              <Route path="/siteflow/order" component={AddSiteFlowOrderView} />
              <Route path="/local/templates/modify/:id" component={AddLocalTemplateView} />
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

export const baseApiUrl = "https://hp.wsuv-cs-project.com:8443/BackendApi-1.0-SNAPSHOT/api";
export default App;
