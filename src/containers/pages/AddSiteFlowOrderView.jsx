import { Component } from 'react';
import React from 'react';
// import { Redirect } from 'react-router';
import FactorySelectDropdown from '../components/FactorySelectDropdown';
import SKUSelectDropdown from '../components/SKUSelectDropdown';
import BootstrapAlert from '../components/BootstrapAlert';

import {
    generateID,
    generateUserName,
    generateAddress,
    generateTownName,
    generateAreaCode,
    generateCompanyName
} from '../assistants/Generators';
/*
TODO: SKU select dropdown needs to be told which factory to pull from!
*/
class AddSiteOrderSKUView extends Component {
    /*
    This is the page where a user can create and submit an order to Site Flow.
    */
    constructor(props) {
        super(props);
        this.state = {
            responseCode: null,
            factory: 'wsu-test-team-1',
            sku: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFactoryChanged = this.onFactoryChanged.bind(this);
        this.onSKUChanged = this.onSKUChanged.bind(this);

        this.orderID = React.createRef();

        this.shippingName = React.createRef();
        this.companyName = React.createRef();
        this.address1 = React.createRef();
        this.town = React.createRef();
        this.postcode = React.createRef();
        this.isoCountry = React.createRef();
    }

    handleSubmit(e) {
        e.preventDefault(); // prevent the form from submitting normally

        // Build the JSON object we want to send to the backend
        var newOrderData = {
            destination: {
                name: this.state.factory
            },
            orderData: {
                sourceOrderId: this.orderID.current.value,
                items: [
                    {
                        sku: this.state.sku,
                        sourceItemId: "Orthotic-Right-1629815804",
                        shipmentIndex: 0,
                        components: [{
                            fetch: true,
                            code: "Orthotic-Component",
                            path: "https://github.com/3MFConsortium/3mf-samples/raw/master/examples/slices/torus_sliced.3mf",
                            sourceComponentId: this.state.sku
                        }]
                    }
                ],
                shipments: [
                    {
                        shipmentIndex: 0,
                        shipTo: {
                            name: this.shippingName.current.value,
                            companyName: this.companyName.current.value,
                            address1: this.address1.current.value,
                            town: this.town.current.value,
                            postcode: this.postcode.current.value,
                            isoCountry: this.isoCountry.current.value
                        },
                        carrier: {
                            code: "customer",
                            service: "shipping",
                            alias: "shipping",
                            serviceId: "609ce85df25ab99e79aa319a"
                        }
                    }
                ]
            }
        };

        console.log(JSON.stringify(newOrderData));
        console.log('Going to make the POST request...');
        fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/order/siteflow/post', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'siteflow-organization': this.state.factory,
            },
            body: JSON.stringify(newOrderData)
        })
            .then((response) => {
                console.log(response);
                console.log(`Got response from the POST request with ${response.status}`);
                this.setState({ responseCode: response.status });
            });
    }

    onFactoryChanged(newFactory) {
        this.setState({ factory: newFactory });
    }

    onSKUChanged(newSKU) {
        this.setState({ sku: newSKU })
    }

    render() {
        // Figure out what alert to display
        let alert = null;
        if (this.state.responseCode != null) {
            if (this.state.responseCode === 201) {
                alert = (<BootstrapAlert alertType='success' content={`Order posted successfully!`} />);
            } else {
                alert = (<BootstrapAlert alertType='danger' content={`Order failed with code ${this.state.responseCode}`} />);
            }
        }

        return (
            <div>
                <h2>Order</h2>
                <p>Create new Order for SiteFlow.</p>

                {/* Account Name */}
                <form onSubmit={this.handleSubmit} className="needs-validation" noValidate>
                    <div className="mb-3">
                        <FactorySelectDropdown onFactoryChanged={this.onFactoryChanged} />
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Order ID */}
                    <div className="mb-3">
                        <label htmlFor="orderID" className="form-label">Order ID</label>
                        <input type="text" className="form-control" id="orderID" name="orderID" ref={this.orderID} defaultValue={generateID()} required></input>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* SKU */}
                    <div className="mb-3">
                        <SKUSelectDropdown factory={this.state.factory} onSKUChanged={this.onSKUChanged} />
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <h4 className='mt-4'>Shipping Address</h4>


                    {/* Shipping Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" ref={this.shippingName} defaultValue={generateUserName()} required></input>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Company Name */}
                    <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">Company</label>
                        <input type="text" className="form-control" id="companyName" name="companyName" ref={this.companyName} defaultValue={generateCompanyName()} required></input>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                        <label htmlFor="address1" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address1" name="address1" ref={this.address1} defaultValue={generateAddress()} required></input>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Town */}
                    <div className="mb-3">
                        <label htmlFor="town" className="form-label">Town</label>
                        <input type="text" className="form-control" id="town" name="town" ref={this.town} defaultValue={generateTownName()} required></input>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Area Code */}
                    <div className="mb-3">
                        <label htmlFor="postcode" className="form-label">Area Code</label>
                        <input type="text" className="form-control" id="postcode" name="postcode" ref={this.postcode} defaultValue={generateAreaCode()} required></input>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Country iso */}
                    <div className="mb-3">
                        <label htmlFor="isoCountry" className="form-label">Country</label>
                        <select className="form-select" id="isoCountry" name="isoCountry" ref={this.isoCountry}>
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
                    {(function () {
                        window.addEventListener('load', function () {
                            var forms = document.getElementsByClassName('needs-validation');
                            // eslint-disable-next-line
                            var validation = Array.prototype.filter.call(forms, function (form) {
                                form.addEventListener('submit', function (event) {
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