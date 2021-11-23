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

class RootPage extends Component {
  render() {
    return (
      <Router>
      <div>

        {/* Navigation bar */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/siteflow/templates">SiteFlow Templates</Link>
            </li>
            <li>
              <Link to="/local/templates">Local Templates</Link>
            </li>
          </ul>
        </nav>

        {/* React switches */}
        <Switch>
          <Route path="/siteflow/templates">
            <SiteFlowTemplateList />
          </Route>
          <Route path="/local/templates">
            <LocalTemplateList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
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
