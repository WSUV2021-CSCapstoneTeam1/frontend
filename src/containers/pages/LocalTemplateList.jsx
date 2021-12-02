import { Component } from 'react';
import { Link } from "react-router-dom";

class LocalTemplateList extends Component {
    /*
    This is the page that displays a list of templates retrieved from the backend database.
    */
    render() {
      return (
        <div>
          <h2>Local Templates</h2>
          <p>These are the templates loaded from the backend database.</p>

          {/* Add Button */}
          <div className="mb-3">
              <Link to="templates/add" className="btn btn-primary">Add Template</Link>
          </div>
        </div>
      );
    }
}

export default LocalTemplateList;