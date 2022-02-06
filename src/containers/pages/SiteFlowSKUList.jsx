import { Component } from 'react';
import { Link } from "react-router-dom";
import SKUListItem from '../components/SKUListItem';

class SiteFlowSKUList extends Component {
    /*
    This is the page that displays a list of SKUs retrieved from Site Flow.
    */
    constructor(props) {
      super(props);
      this.state = { SKUs: [] };
    }
  
    componentDidMount() {
        // Simple GET request using fetch
        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/sku/siteflow/get/all', headers)
          .then(response => {
            if (response.ok) {
               return response.json()
           }
           throw response;
          })
          .then(data => {
            console.log(data);
            this.setState({
              SKUs: data
            });
          })
          .catch(error => {
            console.log(error);
          })
    }
  
    render() {
      /* List of products from site from site */
      var SKUs;
      if (this.state.SKUs.data == null) {
        console.log('it\'s undefined');
        SKUs = null;
      }
      else {
        console.log('it\'s something');
        SKUs = this.state.SKUs.data.map((item, index) => (
          (<SKUListItem data={item} key={item._id} />)
        ));
      }

      // Provides a spinning indicator while in the process of retrieving
      // information. 
      var spinIndicator = null;
      if (SKUs == null) {
        // https://getbootstrap.com/docs/5.1/components/spinners/
        spinIndicator = (<div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>)
      } else if (SKUs.length === 0) {
        SKUs = (<div className='d-flex justify-content-center'>No SKUs loaded</div>)
      }
      
      return (
        <div>
          <Link to="sku/add" className="btn btn-success float-end"><i className="fas fa-plus"></i> New SKU</Link>
          <h2>Site Flow SKUs</h2>
          <p>These are the SKUs loaded from Site Flow.</p>
          {spinIndicator}
          {SKUs}
        </div>
      );
    }
}
  
export default SiteFlowSKUList;
