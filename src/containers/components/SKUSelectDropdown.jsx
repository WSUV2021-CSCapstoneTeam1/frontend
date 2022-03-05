import { Component } from 'react';

class SKUSelectDropdown extends Component {
    /*
    This dropdown allows a user to select a SKU when they're submitting an order
    */

    constructor(props) {
        super(props);
        this.state = { currentSKU: '', allFactoriesAndSKUs: {} };
        this.onSKUChanged = this.onSKUChanged.bind(this);
        this.allFactories = [];
    }

    componentDidMount() {
        this.loadAllFactories();
    }

    loadAllFactories() {
        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/team/rds/get/all', headers)
          .then(response => {
            if (response.ok) {
               return response.json()
           }
           throw response;
          })
            .then(data => {
                this.allFactories = data.data.map((a) => a.name);
                this.loadAllSKUs();
          })
          .catch(error => {
            console.log(error);
          })
    }

    loadAllSKUs() {
        for (const factory of this.allFactories) {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'siteflow-organization': factory
            }
    
            fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/sku/siteflow/get/all', { mode: 'cors', headers: headers })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw response;
                })
                .then(data => {
                    var factories = this.state.allFactoriesAndSKUs;
                    factories[factory] = data;
                    this.setState({
                        allFactoriesAndSKUs: factories
                    });
                    
                })
                .catch(error => {
                    console.log(error);
                })
        }
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
        var skuElements = [];
        var skuList = this.state.allFactoriesAndSKUs[this.props.factory];
        if (skuList == null) {
            console.log('no SKUs');
            skuElements = null;
        }
        else {
            skuElements = skuList.data.map((item) => (
                (<option data={item.code} key={item._id}>{item.code}</option>)
            ));
        }

        return (
            <div>
                <label htmlFor="SKUId" className="form-label">SKU</label>
                <select className="form-select" id="SKUId" name="SKUId" onChange={this.onSKUChanged} value={this.state.currentSKU}>
                    {skuElements}
                </select>
            </div>
        );
    }

}
export default SKUSelectDropdown;