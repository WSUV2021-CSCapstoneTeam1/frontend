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
        <div style={ {border: 'solid'} }>
          <ul key={this.props.templateData._id}>
              <p>name: {this.props.templateData.name}</p>
              <p>extension: {this.props.templateData.extension}</p>
              <p>accountId: {this.props.templateData.accountId}</p>
          </ul>
        </div>
    );
    }
}
  
export default TemplateListItem;