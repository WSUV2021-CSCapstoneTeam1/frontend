import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import { Component } from 'react';

import SiteFlowTemplateList from "./pages/SiteFlowTemplateList";
import LocalTemplateList from './pages/LocalTemplateList';
import AddLocalTemplateView from "./pages/AddLocalTemplateView";
import ModifyLocalTemplateView from "./pages/ModifyLocalTemplateView";
import DeleteLocalTemplateView from "./pages/DeleteLocalTemplateView";


class RootPage extends Component {
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
                    <li className="nav-item fw-light"><a href="/siteflow/templates" className="nav-link">SiteFlow Templates</a></li>
                    <li className="nav-item fw-light"><a href="/local/templates" className="nav-link">Local Templates</a></li>
                </ul>
            </div>
        </nav>

          {/* React switches */}
        <div className="container">
          <Switch>

            <Route path="/siteflow/templates">
              <SiteFlowTemplateList />
            </Route>

            {/*Testing*/}
            <Route path="/local/templates/modify">
              <ModifyLocalTemplateView />
            </Route>

            {/*Testing*/}
            <Route path="/local/templates/delete">
              <DeleteLocalTemplateView />
            </Route>

            <Route path="/local/templates/add">
                <AddLocalTemplateView />
            </Route>

            <Route path="/local/templates">
              <LocalTemplateList />
            </Route>

            <Route path="/">
              <Home />
            </Route>

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
