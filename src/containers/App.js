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

class RootPage extends Component {
  render() {
    return (
      <Router>
      <div>

        {/* Navigation bar */}
        <nav className="navbar fw-bold navbar-light bg-light navbar-expand-md">
            <a href="/" class="navbar-brand">Factory Configurator</a>
            <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbar">
                <ul class="navbar-nav">
                    <li class="nav-item fw-light"><a href="/siteflow/templates" class="nav-link">SiteFlow Templates</a></li>
                    <li class="nav-item fw-light"><a href="/local/templates" class="nav-link">Local Templates</a></li>
                </ul>
            </div>
        </nav>

        <div className="switches">
            {/* React switches */}
            <Switch>
              <Route path="/siteflow/templates">
                <SiteFlowTemplateList />
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
