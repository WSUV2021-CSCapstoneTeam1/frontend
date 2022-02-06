import { Component } from 'react';

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
        // TODO: fetch the list of factories from the backend, and populate
        // the options available
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
        return (
            <div>
                <label htmlFor="factoryId" className="form-label">Factory</label>
                <select className="form-select" id="factoryId" name="factoryId" onChange={this.onFactoryChanged} value={this.state.currentFactory}>
                    <option value="wsu-test-team-1">Team 1 Factory</option>
                    <option value="wsu-test-team-8">Team 8 Factory</option>
                </select>
            </div>
        );
    }
}
  
export default FactorySelectDropdown;