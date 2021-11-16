import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import { Component } from 'react';

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

class SiteFlowTemplateList extends Component {
  /*
  This is the page that displays a list of templates retrieved from SiteFlow.
  */
  constructor(props) {
    super(props);
    this.state = { templates: [] };
  }

  componentDidMount() {
      // Simple GET request using fetch
      const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      fetch('http://34.220.46.204:8090/BackendApi-1.0-SNAPSHOT/webapi/template/get/all', headers)
        .then(response => {
          if (response.ok) {
             return response.json()
         }
         throw response;
        })
        .then(data => {
          console.log(data);
          this.setState({
            templates: data
          });
        })
        .catch(error => {
          console.log(error);
        })
  }

  render() {
    /* List of templates from site from site */
    var templates;
    if (this.state.templates.data == null) {
      console.log('it\'s undefined')
      templates = (<div>no data loaded</div>)
    }
    else {
      console.log('it\'s something')
      templates = this.state.templates.data.map((item, index) => (
        (<TemplateListItem templateData={item} />)
      ));
    }
    
    return (
      <div>
        <h2>SiteFlow Templates</h2>
        <p>These are the templates loaded from SiteFlow.</p>
        <ol>
          {templates}
        </ol>
      </div>
    );
  }
}

class TemplateListItem extends Component {
  /*
  This component represents a single Template item, when displayed in a list.
  */
  constructor(props) {
    super(props);
    this.state = { templateData: props.templateData };
  }

  render() {
    return (
      <div style={ {border: 'solid'} }>
        <ul key={this.props.templateData._id}>
            <p>name: {this.props.templateData.name}</p>
            <p>extension: {this.props.templateData.extension}</p>
            <p>accountId: {this.props.templateData.accountId}</p>
        </ul>
      </div>
  );
  }
}

class LocalTemplateList extends Component {
  /*
  This is the page that displays a list of templates retrieved from the backend database.
  */
  render() {
    return (
      <div>
        <h2>Local Templates</h2>
        <p>These are the templates loaded from the backend database.</p>
      </div>
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
