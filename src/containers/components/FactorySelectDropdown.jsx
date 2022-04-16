import { Component } from 'react';
import { baseApiUrl } from '../App';

class FactorySelectDropdown extends Component {
    /*
    This dropdown allows the user to select a factory.
    */
    constructor(props) {
        super(props);
        this.state = { currentFactory: '', allFactories: [] };
        this.onFactoryChanged = this.onFactoryChanged.bind(this);
    }

    componentDidMount() {

        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            fetch(`${baseApiUrl}/team/rds/get/all`, headers)
              .then(response => {
                if (response.ok) {
                   return response.json()
               }
               throw response;
              })
              .then(data => {
                this.setState({
                  allFactories: data
                })
              })
              .catch(error => {
                console.log(error);
              })
    }

    onFactoryChanged(event) {
        var newFactory = event.target.value;
        console.log(`FactorySelectDropdown - factory set to ${newFactory}`)
        this.setState({ currentFactory: newFactory });
        if (this.props.onFactoryChanged != null) {
            this.props.onFactoryChanged(newFactory);
        } else {
            console.log('FactorySelectDropdown - No onFactoryChanged callback supplied');
        }
    }

    render() {
        var factories = [];
        if (this.state.allFactories.data == null) {
            factories = null;
        }
        else {
            factories = this.state.allFactories.data.map((item) => (
                (<option key={item.name} value={item.name}>{item.name}</option>)
            ));
        }

        return (
            <div>
                <label htmlFor="factoryId" className="form-label">Factory</label>
                <select className="form-select" id="factoryId" name="factoryId" placeholder="FactoryId" onChange={this.onFactoryChanged} value={this.state.currentFactory}>
                    {factories}
                </select>
            </div>
        );
    }
}
  
export default FactorySelectDropdown;