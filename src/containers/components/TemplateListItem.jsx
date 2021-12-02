import { Component } from 'react';

class TemplateListItem extends Component {
    /*
    This component represents a single Template item, when displayed in a list.
    */
    constructor(props) {
      super(props);
      this.state = { templateData: props.templateData };
    }
  
    render() {
      return (
        <li style={{ border: 'solid' }}>
          <div>
              <p>name: {this.props.templateData.name}</p>
              <p>extension: {this.props.templateData.extension}</p>
              <p>accountId: {this.props.templateData.accountId}</p>
          </div>
        </li>
    );
    }
}
  
export default TemplateListItem;