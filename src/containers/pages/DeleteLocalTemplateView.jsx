import { Component } from 'react';
import { baseApiUrl } from '../App';

import BootstrapAlert from '../components/BootstrapAlert';

class DeleteLocalTemplateView extends Component {
    /*
    This is the page that allows you to delete a template
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

        // Need to sanitize input
        console.log(`GET request to delete id=${inputId}`);

        // Simple GET request using fetch
        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        fetch(`${baseApiUrl}/template/rds/delete?id=${inputId}`, headers)
            .then((response) => {
                console.log(response.status);
                this.setState({ responseCode: response.status });
            })
            .catch(error => {
                console.log(error);
            })

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
            <p>Which template would you like to delete? </p>

            <form onSubmit={this.handleSubmit}>
                {/* Input ID of template */}
                <div className="mb-3">
                    <label htmlFor="templateId" className="form-label">Template ID</label>
                    <input type="text" className="form-control" id="templateId" name="templateId"></input>
                </div>
                {/* Add Button */}

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Delete Template</button>
                </div>

                {/* Result alert */}
                {alert}

            </form>
        </div>
        );
    }
}

export default DeleteLocalTemplateView;