import { Component } from 'react';
import { baseApiUrl } from '../App';

// import BootstrapAlert from '../components/BootstrapAlert';

class ModifyLocalTemplateView extends Component {
    /*
    This is the page that allows you to modify a template
    */
    constructor(props) {
        super(props);
        this.state = {
            responseCode: null
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {}

    handleSearch(e) {
        e.preventDefault();

        // TODO: need to sanitize input
        var inputId = e.target.templateId.value;

        console.log(`GET request to search id=${inputId}`);


        // TODO: Check if you get anything back from the response
        // Simple GET request using fetch
        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        fetch(`${baseApiUrl}/template/rds/get?id=${inputId}`, headers)
            .then(response => {
               if (response.ok) {
                  return response.json()
               }
               throw response;
            })
            .then(data => {
                console.log(data);
                this.setState({
                    template: data
                });
            })
            .catch(error => {
                console.log(error);
            })

    }

    handleModify(e) {
        e.preventDefault();
        console.log("We are submitting!");
    }

    render() {

        return (
        <div className="container">
            <h2>Local Templates</h2>
            <p>Which template would you like to modify? </p>

            {/* Search Template Handler */}
            <form onSubmit={this.handleSearch}>
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

            {/* Show Template Data in Fields */}

        </div>
        );
    }
}

export default ModifyLocalTemplateView;