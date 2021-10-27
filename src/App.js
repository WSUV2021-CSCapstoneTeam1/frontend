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
    this.state = { stuff: "nothing loaded yet" };
  }

  componentDidMount() {
    // Simple GET request using fetch
    // fetch('http://127.0.0.1:8080/api/v1/factory/getAll')
    //   .then(response => {
    //     console.log(response);
    //     console.log(response.text());
    //   })
    //   .then(data => {
    //     console.log(data);
    //     this.setState({ stuff: data });
    //   });
  }

  render()
  {
    return (
      <Router>
      <div>
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
