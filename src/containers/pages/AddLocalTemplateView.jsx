import { Component } from 'react';

import BootstrapAlert from '../components/BootstrapAlert';

class AddLocalTemplateView extends Component {
    /*
    This is the page where a user can create and submit a template to the backend.
    */
    constructor(props) {
        super(props);
        this.state = { responseCode: null };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {}
    
    handleSubmit(e) {
        e.preventDefault(); // prevent the form from submitting normally
        
        // Build the JSON object we want to send to the backend
        var newTemplateData = {
            accountId: e.target.accountId.value,
            active: e.target.active.checked,
            globalRead: e.target.globalRead.checked,
            globalResourceName: e.target.globalResourceName.value,
            name: e.target.name.value,
            lookup: e.target.lookup.value,
            type: e.target.type.value,
            text: e.target.text.value,
            extension: e.target.extension.value,
            contentType: e.target.contentType.value
        };

        console.log(JSON.stringify(newTemplateData));
        console.log('Going to make the POST request...');

        fetch('http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/template/rds/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTemplateData)
        })
        .then((response) => {
            console.log(`Got response from the POST request with ${response.status}`);
            console.log(`this state is ${this.state}`);
            this.setState({ responseCode: response.status });
        });
    }
    
    render() {
        // Figure out what alert to display
        let alert = null;
        if (this.state.responseCode != null) {
            if (this.state.responseCode === 200) {
                alert = (<BootstrapAlert alertType='success' content='Template created successfully!' />);
            }
            else {
                alert = (<BootstrapAlert alertType='danger' content={`Template creation failed with code ${this.state.responseCode}`} />);
            }
        }
        return (
            <div className="container">
                <h2>Add Local Template</h2>
                <p>Here is where you can add templates for SiteFlow.</p>
                
                <form onSubmit={this.handleSubmit}>
                    {/* Account ID */}
                    <div className="mb-3">
                        <label htmlFor="accountId" className="form-label">Account ID</label>
                        <input type="text" className="form-control" id="accountId" name="accountId"></input>
                    </div>
                    
                    {/* Active */}
                    <div className="mb-3 form-check">
                        <input className="form-check-input" type="checkbox" value="" id="active" name="active" defaultChecked="true"></input>
                        <label htmlFor="active" className="form-check-label" >Active</label>
                    </div>
                    
                    {/* Global Read */}
                    <div className="mb-3 form-check">
                        <input className="form-check-input" type="checkbox" value="" id="globalRead" name="globalRead" defaultChecked="true"></input>
                        <label htmlFor="globalRead" className="form-check-label">Global Read</label>
                    </div>
                    
                    {/* Global Resource Name */}
                    <div className="mb-3">
                        <label htmlFor="globalResourceName" className="form-label">Global Resource Name</label>
                        <input type="text" className="form-control" id="globalResourceName" name="globalResourceName"></input>
                    </div>
                    
                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name"></input>
                    </div>
                    
                    {/* Lookup */}
                    <div className="mb-3">
                        <label htmlFor="lookup" className="form-label">Lookup</label>
                        <input type="text" className="form-control" id="lookup" name="lookup"></input>
                    </div>
                    
                    {/* Type */}
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Type</label>
                        <select className="form-select" id="type" name="type">
                            <option value="html">HTML</option>
                            <option value="xml">XML</option>
                            <option value="svg">SVG</option>
                            <option value="json">JSON</option>
                            <option value="zpl">ZPL</option>
                        </select>
                    </div>
                    
                    {/* Text */}
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Text</label>
                        <textarea className="form-control" id="text" name="text" rows="12"></textarea>
                    </div>
                    
                    {/* Extension */}
                    <div className="mb-3">
                        <label htmlFor="extension" className="form-label">Extension</label>
                        <input type="text" className="form-control" id="extension" name="extension"></input>
                    </div>
                    
                    {/* Content Type */}
                    <div className="mb-3">
                        <label htmlFor="contentType" className="form-label">MIME Content Type</label>
                        <input type="text" className="form-control" id="contentType" name="contentType"></input>
                    </div>
                    
                    
                    {/* Result alert */}
                    {alert}
                    
                    {/* Add Button */}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Create Template</button>
                    </div>


                </form>
            </div>
            );
        }
    }
    
    export default AddLocalTemplateView;