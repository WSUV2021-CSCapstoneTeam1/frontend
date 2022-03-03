import { Component } from 'react';

class SKUSelectDropdown extends Component {
    /*
    This dropdown allows a user to select a SKU when they're submitting an order
    */

    constructor(props) {
        super(props);
        this.state = {currentSKU: '', allSKUs: [] };
        this.onSKUChanged = this.onSKUChanged.bind(this);

        this.loadAllSKUs = this.loadAllSKUs.bind(this);
    }

    componentDidMount() {
        this.loadAllSKUs();
    }

    componentDidUpdate() {
        // this.loadAllSKUs();
    }

    loadAllSKUs() {
        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'siteflow-organization': this.props.factory }

        console.log("load all SKUs on SKU select");
        fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/sku/siteflow/get/all', { mode: 'cors', headers: headers })
              .then(response => {
                if (response.ok) {
                   return response.json()
               }
               throw response;
              })
                .then(data => {
                    console.log(data);
                this.setState({
                  allSKUs: data
                })
              })
              .catch(error => {
                console.log(error);
              })
    }

    onSKUChanged(event) {
        var newSKU = event.target.value;
        this.setState({ currentSKU: newSKU });
        if (this.props.onSKUChanged != null) {
            this.props.onSKUChanged(newSKU);
        }
        else {
            console.log('SKUSelectDropdown - No onSKUChanged callback supplied');
        }
    }

    render() {
        var skus = [];
        if (this.state.allSKUs.data == null) {
            console.log('no SKUs');
            skus = null;
        }
        else {
            skus = this.state.allSKUs.data.map((item) => (
                (<option data={item.code} key={item._id}>{item.code}</option>)
            ));
        }

        return (
            <div>
                <label htmlFor="SKUId" className="form-label">SKU</label>
                <select className="form-select" id="SKUId" name="SKUId" onChange={this.onSKUChanged} value={this.state.currentSKU}>
                    {skus}
                </select>
            </div>
        );
    }

}
export default SKUSelectDropdown;