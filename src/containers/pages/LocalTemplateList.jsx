import { Component } from 'react';
import { Link } from "react-router-dom";
import { baseApiUrl } from '../App';
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
      fetch(`${baseApiUrl}/template/rds/get/all`, headers)
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

      // Provides a spinning indicator while in the process of retrieving
      // information. 
      var spinIndicator = null;
      if (templates == null) {
        // https://getbootstrap.com/docs/5.1/components/spinners/
        spinIndicator = (<div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>)
      } else if (templates.length === 0) {
        templates = (<div className='d-flex justify-content-center'>No templates loaded</div>)
      }

      return (
        <div>
          <Link to="templates/add" className="btn btn-success float-end"><i className="fas fa-plus"></i> New Template</Link>
          <h2>Local Templates</h2>
          <p>These are the templates loaded from the backend database.</p>
          {spinIndicator}
          {templates}
        </div>
      );
    }
}

export default LocalTemplateList;