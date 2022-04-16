import { Component } from 'react';
import { Link } from "react-router-dom";
import SKUListItem from '../components/SKUListItem';
import FactorySelectDropdown from '../components/FactorySelectDropdown';
import { baseApiUrl } from '../App';

class SiteFlowSKUList extends Component {
    /*
    This is the page that displays a list of SKUs retrieved from Site Flow.
    */
    constructor(props) {
        super(props);
        this.state = { SKUs: [] };
        this.onFactoryChanged = this.onFactoryChanged.bind(this);
    }

    onFactoryChanged(newFactory) {

        this.setState({ SKUs: [] });

        // Simple GET request using fetch
        fetch(`${baseApiUrl}/sku/siteflow/get/all`, {
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'siteflow-organization': newFactory }
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                this.setState({
                    SKUs: data
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
        var SKUs;
        if (this.state.SKUs.data == null) {
            SKUs = null;
        }
        else {
            SKUs = this.state.SKUs.data.map((item, index) => (
                (<SKUListItem data={item} key={item._id} />)
            ));
        }

        // Provides a spinning indicator while in the process of retrieving
        // information. 
        var spinIndicator = null;
        if (SKUs == null) {
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
                <FactorySelectDropdown onFactoryChanged={this.onFactoryChanged} />
                {spinIndicator}
                {SKUs}
            </div>
        );
    }
}

export default SiteFlowSKUList;
