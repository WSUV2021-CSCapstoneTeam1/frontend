import { Component } from 'react';
import TemplateListItem from '../components/TemplateListItem';
import FactorySelectDropdown from '../components/FactorySelectDropdown';
import { baseApiUrl } from '../App';

class SiteFlowTemplateList extends Component {
    /*
    This is the page that displays a list of templates retrieved from SiteFlow.
    */
    constructor(props) {
        super(props);
        this.state = { templates: [] };
        this.onFactoryChanged = this.onFactoryChanged.bind(this);
    }

    onFactoryChanged(newFactory) {
        // console.log(`SiteFlowTemplateList - new factory is ${newFactory}`);

        this.setState({ templates: [] });

        // Simple GET request using fetch
        fetch(`${baseApiUrl}/template/siteflow/get/all`, {
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'siteflow-organization': newFactory }
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                // console.log(data);
                this.setState({
                    templates: data
                });
            })
            .catch(error => {
                console.log(error);
            })

    }

    componentDidMount() {
        // TODO: get default factory instead of hardcoding team 1 factory
        this.onFactoryChanged('wsu-test-team-1');
    }

    render() {
        /* List of templates from site from site */
        var templates;
        if (this.state.templates.data == null) {
            // console.log('it\'s undefined');
            templates = null;
        }
        else {
            // console.log('it\'s something');
            templates = this.state.templates.data.map((item, index) => (
                (<TemplateListItem templateData={item} key={item._id} />)
            ));
        }

        // Provides a spinning indicator while in the process of retrieving
        // information. 
        var spinIndicator = null;
        if (templates == null) {
            // https://getbootstrap.com/docs/5.1/components/spinners/
            spinIndicator = (<div className='d-flex justify-content-center'>
                <div className='spinner-border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
            </div>)
        } else if (templates.length === 0) {
            templates = (<div className='d-flex justify-content-center'>No templates loaded</div>)
        }

        return (
            <div>
                <h2>Site Flow Templates</h2>
                <p>These are the templates loaded from Site Flow.</p>
                <FactorySelectDropdown onFactoryChanged={this.onFactoryChanged} />
                {spinIndicator}
                {templates}
            </div>
        );
    }
}

export default SiteFlowTemplateList;
