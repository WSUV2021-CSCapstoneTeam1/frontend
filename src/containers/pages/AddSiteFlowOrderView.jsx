import { Component } from 'react';
import { Redirect } from 'react-router';

import BootstrapAlert from '../components/BootstrapAlert';

class AddSiteOrderSKUView extends Component {
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
        var newOrderData = {

            accountName: e.target.accountName.value,
            orderID: e.target.orderID.value,
            // array of skus named items?

            // ship to - Make this an array of address objects?
            shippingName: e.target.shippingName.value,
            companyName: e.target.companyName.value,
            address: e.target.address.value,
            town: e.target.town.value,
            postCode: e.target.areaCode.value,
            isoCountry: e.target.isoCountry.value,

        };

        console.log(JSON.stringify(newOrderData));
        console.log('Going to make the POST request...');

        fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/sku/siteflow/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrderData)
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
//                 alert = (<Redirect to="/siteflow/sku" />);
                console.log("Stuff is ok");
            } else {
//                 alert = (<BootstrapAlert alertType='danger' content={`SKU ${inEditMode ? 'edit' : 'creation'} failed with code ${this.state.responseCode}`} />);
                console.log("Stuff went wrong");
            }
        }

        return (
            <div>
                <h2>Order</h2>
                <p>Create new Order for SiteFlow.</p>

                {/* Account Name */}
                <form onSubmit={this.handleSubmit} class="needs-validation" noValidate>
                    <div className="mb-3">
                        <label htmlFor="accountName" className="form-label">Account Name</label>
                        <input type="text" className="form-control" id="accountName" name="accountName" defaultValue={ inEditMode ? this.state.data.skuCode : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Order ID */}
                    <div className="mb-3">
                        <label htmlFor="orderID" className="form-label">Order ID</label>
                        <input type="text" className="form-control" id="orderID" name="orderID" defaultValue={ inEditMode ? this.state.data.description : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <h4>Shipping Address</h4>

                    {/* Shipping Name */}
                    <div className="mb-3">
                        <label htmlFor="shippingName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="shippingName" name="shippingName" defaultValue={ inEditMode ? this.state.data.description : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Company Name */}
                    <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">Company</label>
                        <input type="text" className="form-control" id="companyName" name="companyName" defaultValue={ inEditMode ? this.state.data.description : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name="address" defaultValue={ inEditMode ? this.state.data.description : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Town */}
                    <div className="mb-3">
                        <label htmlFor="town" className="form-label">Town</label>
                        <input type="text" className="form-control" id="town" name="town" defaultValue={ inEditMode ? this.state.data.description : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Area Code */}
                    <div className="mb-3">
                        <label htmlFor="areaCode" className="form-label">Area Code</label>
                        <input type="text" className="form-control" id="areaCode" name="areaCode" defaultValue={ inEditMode ? this.state.data.description : ''} required></input>
                        <div class="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Country iso */}
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Country</label>
                        <select className="form-select" id="type" name="type" defaultValue={ inEditMode ? this.state.data.type : 'html'}>
                            <option value="US">US</option>
                            <option value="PE">PE</option>
                            <option value="MA">MA</option>
                        </select>
                    </div>

                    {/* Result alert */}
                    {alert}

                    {/* Add Button */}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Place Order</button>
                    </div>


                </form>

                <div className="AddSiteOrderSKUView" ref={el => (this.div = el)}>
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

    export default AddSiteOrderSKUView;