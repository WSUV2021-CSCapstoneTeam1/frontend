import { Component } from 'react';

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

        console.log(`GET request to delete id=${inputId}`);

        // Simple GET request using fetch
        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        fetch(`http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/template/rds/delete?id=${inputId}`, headers)
            .then(response => {
                console.log(response.status);
                this.setState({ responseCode: response.status });
            })
            .catch(error => {
                console.log(error);
            })

    }

    render() {

        return (
        <div className="container">
            <h2>Local Templates</h2>
            <p>Which template would you like to change? </p>

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
            </form>
        </div>
        );
    }
}

export default ModifyLocalTemplateView;