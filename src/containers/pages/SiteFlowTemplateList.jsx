import { Component } from 'react';
import TemplateListItem from '../components/TemplateListItem';

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
        fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/template/siteflow/get/all', headers)
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
        console.log('it\'s undefined');
        templates = null;
      }
      else {
        console.log('it\'s something');
        templates = this.state.templates.data.map((item, index) => (
          (<TemplateListItem templateData={item} key={item._id} />)
        ));
      }
      
      return (
        <div>
          <h2>SiteFlow Templates</h2>
          <p>These are the templates loaded from SiteFlow.</p>
          {templates == null ? (<p>No templates loaded</p>) : (null)}
          {templates}
        </div>
      );
    }
}
  
export default SiteFlowTemplateList;