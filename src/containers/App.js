import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import { Component } from 'react';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { people: [] };
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
             people: data // set the array to peoples
           });
         })
         .catch(error => {
           console.log(error);
         })
    }

  render() {

    /* Temp list of people from site */

    var peopleList;
    if (this.state.people.data == null) {
      console.log('it\'s undefined')
      peopleList = (<div>no data loaded</div>)
    }
    else {
      console.log('it\'s something')
      peopleList = this.state.people.data.map((item, index) => (
        <li key={index}>
          <p>{JSON.stringify(item)}</p>
        </li>
      ));
    }


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
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* React switches */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      {/* Temp print to screen */}
      <ol>
          {peopleList}
      </ol>

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

function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      <p>This is the contact page.</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>This is a placeholder website.</p>
    </div>
  );
}

function App() {
  return <Welcome/>
}

export default App;
