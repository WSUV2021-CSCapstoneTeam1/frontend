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
    this.state = { people: [], };
  }

  componentDidMount() {
    // Simple GET request using fetch
     fetch('http://localhost:8080/api/v1/factory/getAll')
       .then(response => response.json() )
       .then(data => {
         console.log(data);
         this.setState({
           people: data // set the array to peoples
         });
       });
  }

  render() {

    /* Temp list of people from site */
    const peopleList = this.state.people.map((item, index) => (
      <li key={index}>
        <p>{item.name} has id {item.id}</p>
      </li>
    ));

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
