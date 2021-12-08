import { Component } from 'react';
import { Link } from "react-router-dom";
import TemplateListItem from '../components/TemplateListItem';

class LocalTemplateList extends Component {
    /*
    This is the page that displays a list of templates retrieved from the backend database.
    */
    constructor(props) {
      super(props);
      this.state = { templates: [] };
      this.refreshList = this.refreshList.bind(this);
    }

    componentDidMount() {
      this.refreshList();
    }
  
    refreshList() {
      console.log("refresh the list");
      // Simple GET request using fetch
      const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/template/rds/get/all', headers)
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
    /* List of templates from database */
      var templates = [];
      if (this.state.templates.data == null) {
        console.log('it\'s undefined');
        templates = null;
      }
      else {
        console.log('it\'s something');
        templates = this.state.templates.data.map((item, index) => (
          (<TemplateListItem templateData={item} key={item.id} onDelete={this.refreshList}/>)
        ));
      }

      return (
        <div>
          <Link to="templates/add" className="btn btn-success float-end"><i className="fas fa-plus"></i> New Template</Link>
          <h2>Local Templates</h2>
          <p>These are the templates loaded from the backend database.</p>
          {templates == null ? (<p>No templates loaded</p>) : (templates)}


        </div>
      );
    }
}

export default LocalTemplateList;