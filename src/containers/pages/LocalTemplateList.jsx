import { Component } from 'react';

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

export default LocalTemplateList;