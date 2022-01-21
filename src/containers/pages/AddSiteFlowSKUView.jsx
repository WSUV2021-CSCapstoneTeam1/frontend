import { Component } from 'react';
import { Redirect } from 'react-router';

import BootstrapAlert from '../components/BootstrapAlert';

class AddSiteFlowSKUView extends Component {
    /*
    This is the page where a user can create and submit a SKU to Site Flow.
    */
    constructor(props) {
        super(props);
        this.state = { responseCode: null, mode: 'new', id: -1000, data: {} };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ mode: 'new' }); // leave in case we want to change a SKU later
        console.log(this.state);
    }

    handleSubmit(e) {
        e.preventDefault(); // prevent the form from submitting normally

        // Build the JSON object we want to send to the backend
        var newSkuData = {

            packageId: e.target.packageId.value, // need to add this
            code: e.target.skuCode.value,
            description: e.target.description.value,
            productId: e.target.productId.value,
            active: e.target.active.checked,
            maxItems: e.target.maxItems.value,
            minSLA: e.target.minSLA.value,
            SLADuration: e.target.SLADuration.value,
            unitCost: e.target.unitCost.value,
            unitPrice: e.target.unitPrice.value

        };

        console.log(JSON.stringify(newSkuData));
        console.log('Going to make the POST request...');

        fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/template/rds/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSkuData)
        })
            .then((response) => {
                console.log(response);
            console.log(`Got response from the POST request with ${response.status}`);
            console.log(`this state is ${this.state}`);
            this.setState({ responseCode: response.status });
        });
    }

    render() {
        let inEditMode = this.state.mode === 'edit';

        // Figure out what alert to display
        let alert = null;
        if (this.state.responseCode != null) {
            if (this.state.responseCode === 200) {
                // alert = (<BootstrapAlert alertType='success' content={`Template ${inEditMode ? 'edited' : 'created'} successfully!`} />);
                alert = (<Redirect to="/local/templates" />);
            }
            else {
                alert = (<BootstrapAlert alertType='danger' content={`Template ${inEditMode ? 'edit' : 'creation'} failed with code ${this.state.responseCode}`} />);
            }
        }

        return (
            <div>
                <h2>Add SKU</h2>
                <p>Add new SKU for SiteFlow.</p>

                <form onSubmit={this.handleSubmit}>
                    {/* Sku Code */}
                    <div className="mb-3">
                        <label htmlFor="skuCode" className="form-label">SKU Code</label>
                        <input type="text" className="form-control" id="skuCode" name="skuCode" defaultValue={ inEditMode ? this.state.data.skuCode : ''}></input>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" defaultValue={ inEditMode ? this.state.data.description : ''}></input>
                    </div>

                    {/* Active */}
                    <div className="mb-3 form-check">
                        <input className="form-check-input" type="checkbox" value="" id="active" name="active" defaultChecked={this.state.data.active}></input>
                        <label htmlFor="active" className="form-check-label">Active</label>
                    </div>

                    {/* MaxItems - Not done */}
                    <div className="mb-3 form-check">
                        <input className="form-check-input" type="number" min="0" value="" data-bind="value:maxItems"
                            id="maxItems" name="maxItems" defaultChecked={this.state.data.maxItems}></input>
                        <label htmlFor="maxItems" className="form-check-label">Max Items</label>
                    </div>

                    {/* MinSLA */}
                    <div className="mb-3">
                        <label htmlFor="minSLA" className="form-label">Min SLA</label>
                        <input type="text" className="form-control" id="minSLA" name="minSLA" defaultValue={ inEditMode ? this.state.data.minSLA : ''}></input>
                    </div>

                    {/* SLADuration */}
                    <div className="mb-3">
                        <label htmlFor="SLADuration" className="form-label">SLA Days</label>
                        <input type="text" className="form-control" id="SLADuration" name="SLADuration" defaultValue={ inEditMode ? this.state.data.SLADuration : ''}></input>
                    </div>

                    {/* ProductId */}
                    {/* Need to get information on all products - this is temp */}
                    <div className="mb-3">
                        <label htmlFor="productId" className="form-label">Product</label>
                        <select className="form-select" id="productId" name="productId" defaultValue={ inEditMode ? this.state.data.productId : 'html'}>
                            <option value="product1">Product 1</option>
                            <option value="product2">Product 2</option>
                        </select>
                    </div>

                    {/* unitCost */}
                    <div className="mb-3">
                        <label htmlFor="unitCost" className="form-label">Unit Cost</label>
                        <textarea className="form-control" id="unitCost" name="unitCost" defaultValue={ inEditMode ? this.state.data.unitCost : ''}></textarea>
                    </div>

                    {/* unitPrice */}
                    <div className="mb-3">
                        <label htmlFor="unitPrice" className="form-label">Unit Price</label>
                        <input type="text" className="form-control" id="unitPrice" name="unitPrice" defaultValue={ inEditMode ? this.state.data.unitPrice : ''}></input>
                    </div>

                    {/* Result alert */}
                    {alert}

                    {/* Add Button */}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Add SKU</button>
                    </div>


                </form>
            </div>
            );
        }
    }

    export default AddSiteFlowSKUView;