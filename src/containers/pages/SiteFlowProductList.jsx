import { Component } from 'react';
import ProductListItem from '../components/ProductListItem';

class SiteFlowProductList extends Component {
    /*
    This is the page that displays a list of products retrieved from Site Flow.
    */
    constructor(props) {
      super(props);
      this.state = { products: [] };
    }
  
    componentDidMount() {
        // Simple GET request using fetch
        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/product/siteflow/get/all', headers)
          .then(response => {
            if (response.ok) {
               return response.json()
           }
           throw response;
          })
          .then(data => {
            console.log(data);
            this.setState({
              products: data
            });
          })
          .catch(error => {
            console.log(error);
          })
    }
  
    render() {
      /* List of products from site from site */
      var products;
      if (this.state.products.data == null) {
        console.log('it\'s undefined');
        products = null;
      }
      else {
        console.log('it\'s something');
        products = this.state.products.data.map((item, index) => (
          (<ProductListItem data={item} key={item._id} />)
        ));
      }
      
      return (
        <div>
          <h2>Site Flow Products</h2>
          <p>These are the products loaded from Site Flow.</p>
          {products == null ? (<p>No products loaded</p>) : (null)}
          <ul>
            {products}
          </ul>
        </div>
      );
    }
}
  
export default SiteFlowProductList;