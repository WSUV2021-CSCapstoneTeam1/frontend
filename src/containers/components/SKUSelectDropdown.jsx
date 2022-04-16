import { Component } from 'react';
import { baseApiUrl } from '../App';

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
        fetch(`${baseApiUrl}/team/rds/get/all`, headers)
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

            fetch(`${baseApiUrl}/sku/siteflow/get/all`, { mode: 'cors', headers: headers })
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
                    var factories = this.state.allFactoriesAndSKUs;
                    factories[factory] = {
                        data: []
                    };
                    this.setState({
                        allFactoriesAndSKUs: factories
                    });
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
            skuElements = null;
        }
        else {
            skuElements = skuList.data.map((item) => (
                (<option value={item.code} key={item._id}></option>)
            ));
        }

        let currentSkuIsValid = false;
        let validation = '';
        if (skuList !== undefined && skuList.data !== null) {
            let skuNames = skuList.data.map((i) => i.code);
            currentSkuIsValid = skuNames.includes(this.state.currentSKU);

            if (this.state.currentSKU === '') {
                validation = '';
            } else if (currentSkuIsValid) {
                validation = 'is-valid';
            } else {
                validation = 'is-invalid';
            }
        }

        return (
            <div>
                <label htmlFor="SKUId" className="form-label">SKU</label>
                <input className={`form-control ${validation}`} list="SKUIdOptions" id="SKUId" onChange={this.onSKUChanged}></input>
                <datalist id="SKUIdOptions" name="SKUIdOptions" value={this.state.currentSKU}>
                    {skuElements}
                </datalist>
            </div>
        );
    }

}
export default SKUSelectDropdown;