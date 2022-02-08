import { Component } from 'react';
import ProductListItem from '../components/ProductListItem';
import FactorySelectDropdown from '../components/FactorySelectDropdown';

class SiteFlowProductList extends Component {
    /*
    This is the page that displays a list of products retrieved from Site Flow.
    */
    constructor(props) {
        super(props);
        this.state = { products: [] };
        this.onFactoryChanged = this.onFactoryChanged.bind(this);
    }

    onFactoryChanged(newFactory) {
        console.log(`SiteFlowProductList - new factory is ${newFactory}`);

        this.setState({ products: [] });

        // Simple GET request using fetch
        fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/product/siteflow/get/all',  {
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'siteflow-organization': 'wsu-test-team-1' }
            })
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

    componentDidMount() {
        // TODO: get default factory instead of hardcoding team 1 factory
        this.onFactoryChanged('wsu-test-team-1');
    }

    render() {
        /* List of products from site from site */
        var products = [];
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

        // Provides a spinning indicator while in the process of retrieving
        // information. 
        var spinIndicator = null;
        if (products == null) {
            // https://getbootstrap.com/docs/5.1/components/spinners/
            spinIndicator = (<div className='d-flex justify-content-center'>
                <div className='spinner-border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
            </div>)
        } else if (products.length === 0) {
            products = (<div className='d-flex justify-content-center'>No products loaded</div>)
        }

        return (
            <div>
                <h2>Site Flow Products</h2>
                <p>These are the products loaded from Site Flow.</p>
                <FactorySelectDropdown onFactoryChanged={this.onFactoryChanged} />
                {spinIndicator}
                {products}
            </div>
        );
    }
}

export default SiteFlowProductList;
