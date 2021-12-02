import { Component } from 'react';

import BootstrapAlert from '../components/BootstrapAlert';

class ModifyLocalTemplateView extends Component {
    /*
    This is the page that allows you to modify a template
    */
    constructor(props) {
        super(props);
        this.state = { responseCode: null };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {}

    handleSubmit(e) {
        e.preventDefault();

        // need to sanitize input
        var inputId = e.target.templateId.value;

    }

    render() {

        // TODO: look into what error codes we get from the backend
        // Figure out what alert to display
        let alert = null;
        if (this.state.responseCode != null) {
            if (this.state.responseCode === 200) {
                alert = (<BootstrapAlert alertType='success' content='Template deleted successfully!' />);
            }
            else {
                alert = (<BootstrapAlert alertType='danger' content={`Template deletion failed with code ${this.state.responseCode}`} />);
            }
        }

        return (
        <div>
            <h2>Local Templates</h2>
            <p>Which template would you like to change? </p>

            <form onSubmit={this.handleSubmit}>
            </form>
        </div>
        );
    }
}

export default ModifyLocalTemplateView;