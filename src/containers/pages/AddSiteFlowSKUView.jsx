import { Component } from 'react';
import { Redirect } from 'react-router';

import BootstrapAlert from '../components/BootstrapAlert';

class AddSiteFlowSKUView extends Component {
    /*
    This is the page where a user can create and submit a SKU to Site Flow.
    */
    constructor(props) {
        super(props);
        this.state = { responseCode: null, mode: 'new', id: -1000, data: {}, products: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ mode: 'new' }); // leave in case we want to change a SKU later
        console.log(this.state);


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
            this.setState({
              products: data
            });
          })
          .catch(error => {
            console.log(error);
          })
    }

    handleSubmit(e) {
        e.preventDefault(); // prevent the form from submitting normally

        // Build the JSON object we want to send to the backend
        var newSkuData = {

            packageId: null,
            code: e.target.skuCode.value,
            description: e.target.description.value,
            productId: e.target.productId.value, // "615dc2a3628d1517e80467e5" why all the same?
            active: e.target.active.checked,
            maxItems: e.target.maxItems.value,
            minSLA: e.target.minSLA.value,
            SLADuration: e.target.SLADuration.value,
            unitCost: e.target.unitCost.value,
            unitPrice: e.target.unitPrice.value

        };

        console.log(JSON.stringify(newSkuData));
        console.log('Going to make the POST request...');

        fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/sku/siteflow/post', {
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
            if (this.state.responseCode === 201) {
                alert = (<Redirect to="/siteflow/sku" />);
            }
            else if (this.state.responseCode === 400) {
                alert = (<BootstrapAlert alertType='danger' content={`The SKU name has already been taken. `} />);
            }
            else {
                alert = (<BootstrapAlert alertType='danger' content={`SKU ${inEditMode ? 'edit' : 'creation'} failed with code ${this.state.responseCode}`} />);
            }
        }

        return (
            <div>
                <h2>Add SKU</h2>
                <p>Add new SKU for SiteFlow.</p>

                <form onSubmit={this.handleSubmit} class="needs-validation" noValidate>
                    {/* SKU Code */} {/*no spaces*/}
                    <div className="mb-3">
                        <label htmlFor="skuCode" className="form-label">SKU Code</label>
                        <input type="text" className="form-control" id="skuCode" name="skuCode" defaultValue={ inEditMode ? this.state.data.skuCode : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" defaultValue={ inEditMode ? this.state.data.description : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Active */}
                    <div className="mb-3 form-check">
                        <input className="form-check-input" type="checkbox" value="" id="active" name="active" defaultChecked={true}></input>
                        <label htmlFor="active" className="form-check-label">Active</label>
                    </div>

                    {/* Max Items */}
                    <div className="mb-3">
                        <label htmlFor="maxItems" className="form-label">Max Items</label>
                        <input type="number" className="form-control" id="maxItems" name="maxItems" min="0" defaultValue={ inEditMode ? this.state.data.minSLA : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* MinSLA */}
                    <div className="mb-3">
                        <label htmlFor="minSLA" className="form-label">Min SLA</label>
                        <input type="number" className="form-control" id="minSLA" name="minSLA" min="0" defaultValue={ inEditMode ? this.state.data.minSLA : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* SLADuration */}
                    <div className="mb-3">
                        <label htmlFor="SLADuration" className="form-label">SLA Days</label>
                        <input type="number" className="form-control" id="SLADuration" name="SLADuration" min="0" defaultValue={ inEditMode ? this.state.data.SLADuration : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* ProductId */}
                    {/* Need to get information on all products - this is temp */}
                    <div className="mb-3">
                        <label htmlFor="productId" className="form-label">Products</label>
                        <select className="form-select" id="productId" name="productId" defaultValue={ inEditMode ? this.state.data.productId : 'html'}>
                            {this.state.products.data ? this.state.products.data.map((item) => (
                                <option key={item._id} value={item._id}>{item.productCode}</option>
                            )) : console.log("Did not load products")}
                        </select>
                    </div>

                    {/* unitCost */}
                    <div className="mb-3">
                        <label htmlFor="unitCost" className="form-label">Unit Cost</label>
                        <input type="number" min="0" step=".001" className="form-control" id="unitCost" name="unitCost" defaultValue={ inEditMode ? this.state.data.unitCost : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* unitPrice */}
                    <div className="mb-3">
                        <label htmlFor="unitPrice" className="form-label">Unit Price</label>
                        <input type="number" min="0" step=".001" className="form-control" id="unitPrice" name="unitPrice" defaultValue={ inEditMode ? this.state.data.unitPrice : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Result alert */}
                    {alert}

                    {/* Add Button */}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Add SKU</button>
                    </div>


                </form>

                <div className="AddSiteFlowSKUView" ref={el => (this.div = el)}>
                {(function() {
                  window.addEventListener('load', function() {
                    var forms = document.getElementsByClassName('needs-validation');
                    // eslint-disable-next-line
                    var validation = Array.prototype.filter.call(forms, function(form) {
                      form.addEventListener('submit', function(event) {
                        if (form.checkValidity() === false) {
                          event.preventDefault();
                          event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                      }, false);
                    });
                  }, false);
                })()}
                </div>
            </div>
            );
        }
    }

    export default AddSiteFlowSKUView;