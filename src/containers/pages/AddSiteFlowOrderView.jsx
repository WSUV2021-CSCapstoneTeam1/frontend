import { Component } from 'react';
import React from 'react';
import FactorySelectDropdown from '../components/FactorySelectDropdown';
import SKUSelectDropdown from '../components/SKUSelectDropdown';

import {
    generateID,
    generateUserName,
    generateAddress,
    generateTownName,
    generateAreaCode,
    generateCompanyName
} from '../assistants/Generators';
import { baseApiUrl } from '../App';


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
                sourceOrderId: generateID(),
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

        this.setState({orderID: newOrderData.orderData.sourceOrderId});
        fetch(`${baseApiUrl}/order/siteflow/post`, {
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
        let responseHdr = "";
        let responseMsg = "";
        if (this.state.responseCode != null) {
            if (this.state.responseCode === 201) {
                responseHdr = "Thank you for your order"
                responseMsg = `Your order was successful!\nYour Order ID is ${this.state.orderID}.`
            } else {
                responseHdr = "Uh-oh. Something went wrong."
                responseMsg = "Your order was unsuccessful. Please try again later."
            }
        }

        // Name
        // TODO: check if current is null.
        // If so, then don't add any class to the form
        // If not:
        //  Check if string length is greater than 0 and apply checkmark if so
        // let shippingNameExists = this.shippingName.current !== null;

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
                    {/* alert */ }

                    {/* Add Button */}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#orderModal">Place Order</button>
                    </div>
                </form>

                <div className="modal fade" id="orderModal" tabIndex="-1" aria-labelledby="orderModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{responseHdr}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {responseMsg}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>

                <div className="AddSiteOrderSKUView" ref={el => (this.div = el)}>
                </div>
            </div>
        );
    }
}

export default AddSiteOrderSKUView;