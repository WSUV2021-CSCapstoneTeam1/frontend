import { Component } from 'react';
// import { Redirect } from 'react-router';
import FactorySelectDropdown from '../components/FactorySelectDropdown';
import SKUSelectDropdown from '../components/SKUSelectDropdown';
import BootstrapAlert from '../components/BootstrapAlert';

class AddSiteOrderSKUView extends Component {
    /*
    This is the page where a user can create and submit an order to Site Flow.
    */
    constructor(props) {
        super(props);
        this.state = {
            responseCode: null,
            factory: '',
            orderID: '',
            sku: '',
            shipping: {
                name: '',
                companyName: '',
                address1: '',
                town: '',
                postcode: '',
                isoCountry: ''
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFactoryChanged = this.onFactoryChanged.bind(this);
        this.onSKUChanged = this.onSKUChanged.bind(this);
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
            destination: {
                name: this.state.factory
            },
            orderData: {
                sourceOrderId: this.state.orderID,
                items: [
                    {
                        sku: this.state.sku,
                        sourceItemId: "SOURCE ITEM ID",
                        shipmentIndex: 0,
                        components: {
                            fetch: true,
                            code: "SOME CODE",
                            path: "URL",
                            sourceComponentId: "SOURCE COMPONENT ID"
                        }
                    }
                ]
            },
            shipments: [
                {
                    shipmentIndex: 0,
                    shipTo: this.state.shipping,
                    carrier: {
                        code: "fedex",
                        service: "ground"
                    }
                }
            ]
        };

        console.log(JSON.stringify(newOrderData));
        // console.log('Going to make the POST request...');
        // fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/order/siteflow/post', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newOrderData)
        // })
        //     .then((response) => {
        //         console.log(response);
        //         console.log(`Got response from the POST request with ${response.status}`);
        //         console.log(`this state is ${this.state}`);
        //         this.setState({ responseCode: response.status });
        // });
    }

    onFactoryChanged(newFactory) {
        this.setState({ factory: newFactory });
    }

    onSKUChanged(newSKU) {
        this.setState({ sku: newSKU })
    }

    onShippingNameUpdated(e) {
        this.setState({ shipping: { name: e.target.value } });
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
                        <input type="text" className="form-control" id="orderID" name="orderID" required></input>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* SKU */}
                    <div className="mb-3">
                        {/* <label htmlFor="sku" className="form-label">SKU</label>
                        <input type="text" className="form-control" id="sku" name="sku" value={this.state.sku} onChange={this.onSkuChanged} required></input> */}
                        <SKUSelectDropdown onSKUChanged={this.onSKUChanged} />
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    <h4>Shipping Address</h4>

                    {/* Shipping Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={this.state.shipping.name} onChange={this.onShippingNameUpdated} required></input>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Company Name */}
                    <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">Company</label>
                        <input type="text" className="form-control" id="companyName" name="companyName" required></input>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name="address" required></input>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Town */}
                    <div className="mb-3">
                        <label htmlFor="town" className="form-label">Town</label>
                        <input type="text" className="form-control" id="town" name="town" required></input>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Area Code */}
                    <div className="mb-3">
                        <label htmlFor="areaCode" className="form-label">Area Code</label>
                        <input type="text" className="form-control" id="areaCode" name="areaCode" required></input>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div>

                    {/* Country iso */}
                    <div className="mb-3">
                        <label htmlFor="isoCountry" className="form-label">Country</label>
                        <select className="form-select" id="isoCountry" name="isoCountry">
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