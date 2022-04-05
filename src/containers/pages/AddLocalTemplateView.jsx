import { Component } from 'react';
import { Redirect } from 'react-router';
import { baseApiUrl } from '../App';

import BootstrapAlert from '../components/BootstrapAlert';

class AddLocalTemplateView extends Component {
    /*
    This is the page where a user can create and submit a template to the backend.
    */
    constructor(props) {
        super(props);
        this.state = { responseCode: null, mode: 'new', id: -1000, data: {} };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        console.log(this.props);

        if (Object.keys(this.props.match.params).length !== 0)
        {
            console.log(`let's edit, the ID is ${this.props.match.params.id}`);
            this.setState({ mode: 'edit', id: this.props.match.params.id });

            // Let's load the default data
            let id = this.props.match.params.id;
            let url = `${baseApiUrl}/template/rds/get?id=${id}`;
            console.log(url);
            const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            fetch(url, headers)
              .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
              })
              .then(data => {
                  
                console.log(data);
                this.setState({
                  data: data.data[0]
                });
              })
              .catch(error => {
                console.log(error);
              })
        }
        else
        {
            console.log("make a new one");
            this.setState({ mode: 'new' });
        }
    }
    
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

        if (this.state.mode === 'new')
        {
            console.log(JSON.stringify(newTemplateData));
            console.log('Going to make the POST request...');
    
            fetch(`${baseApiUrl}/template/rds/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTemplateData)
            })
                .then((response) => {
                    console.log(response);
                console.log(`Got response from the POST request with ${response.status}`);
                console.log(`this state is ${this.state}`);
                this.setState({ responseCode: response.status });
            });
        }

        else if (this.state.mode === 'edit')
        {
            console.log(JSON.stringify(newTemplateData));
            console.log('Going to make the POST request...');
    
            fetch(`${baseApiUrl}/template/rds/update?id=${this.state.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTemplateData)
            })
                .then((response) => {
                    console.log(response);
                console.log(`Got response from the POST request with ${response.status}`);
                console.log(`this state is ${this.state}`);
                    this.setState({ responseCode: response.status });
            });
        }

    }
    
    render() {
        let inEditMode = this.state.mode === 'edit';

        // Figure out what alert to display
        let alert = null;
        if (this.state.responseCode != null) {
            if (this.state.responseCode === 200) {
                // alert = (<BootstrapAlert alertType='success' content={`Template ${inEditMode ? 'edited' : 'created'} successfully!`} />);
                alert = (<Redirect to="/local/templates" />);
            }
            else {
                alert = (<BootstrapAlert alertType='danger' content={`Template ${inEditMode ? 'edit' : 'creation'} failed with code ${this.state.responseCode}`} />);
            }
        }

        

        console.log(this.state.data);

        return (
            <div>
                <h2>{inEditMode ? 'Edit' : 'Add'} Local Template</h2>
                <p>{inEditMode ? `Edit the template with ID ${this.state.id}` : 'Add a new template'} for SiteFlow.</p>
                
                <form onSubmit={this.handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" defaultValue={ inEditMode ? this.state.data.name : ''}></input>
                    </div>
                    
                    {/* Account ID */}
                    <div className="mb-3">
                        <label htmlFor="accountId" className="form-label">Account ID</label>
                        <input type="text" className="form-control" id="accountId" name="accountId" defaultValue={ inEditMode ? this.state.data.accountId : ''}></input>
                    </div>
                    
                    {/* Active */}
                    <div className="mb-3 form-check">
                        <input className="form-check-input" type="checkbox" value="" id="active" name="active" defaultChecked={this.state.data.active}></input>
                        <label htmlFor="active" className="form-check-label">Active</label>
                    </div>
                    
                    {/* Global Read */}
                    <div className="mb-3 form-check">
                        <input className="form-check-input" type="checkbox" value="" id="globalRead" name="globalRead" defaultChecked={this.state.data.globalRead}></input>
                        <label htmlFor="globalRead" className="form-check-label">Global Read</label>
                    </div>
                    
                    {/* Global Resource Name */}
                    <div className="mb-3">
                        <label htmlFor="globalResourceName" className="form-label">Global Resource Name</label>
                        <input type="text" className="form-control" id="globalResourceName" name="globalResourceName" defaultValue={ inEditMode ? this.state.data.globalResourceName : ''}></input>
                    </div>
                    
                    {/* Lookup */}
                    <div className="mb-3">
                        <label htmlFor="lookup" className="form-label">Lookup</label>
                        <input type="text" className="form-control" id="lookup" name="lookup" defaultValue={ inEditMode ? this.state.data.lookup : ''}></input>
                    </div>
                    
                    {/* Type */}
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">Type</label>
                        <select className="form-select" id="type" name="type" defaultValue={ inEditMode ? this.state.data.type : 'html'}>
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
                        <textarea className="form-control" id="text" name="text" rows="12" defaultValue={ inEditMode ? this.state.data.text : ''}></textarea>
                    </div>
                    
                    {/* Extension */}
                    <div className="mb-3">
                        <label htmlFor="extension" className="form-label">Extension</label>
                        <input type="text" className="form-control" id="extension" name="extension" defaultValue={ inEditMode ? this.state.data.extension : ''}></input>
                    </div>
                    
                    {/* Content Type */}
                    <div className="mb-3">
                        <label htmlFor="contentType" className="form-label">MIME Content Type</label>
                        <input type="text" className="form-control" id="contentType" name="contentType" defaultValue={ inEditMode ? this.state.data.contentType : ''}></input>
                    </div>
                    
                    
                    {/* Result alert */}
                    {alert}
                    
                    {/* Add Button */}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">{inEditMode ? 'Edit': 'Add'} Template</button>
                    </div>


                </form>
            </div>
            );
        }
    }
    
    export default AddLocalTemplateView;