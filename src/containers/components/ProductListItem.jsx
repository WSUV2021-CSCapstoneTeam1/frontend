import { Component } from 'react';

class ProductListItem extends Component {
    /*
    This component represents a single Product item, when displayed in a list.
    */
    constructor(props) {
      super(props);
      this.state = { data: props.data, lastResponseCode: null };
    }
  
    render() {
      let enabledClass = ["fas"];
      if (this.props.data.active)
      {
        enabledClass.push("fa-check-circle");
        enabledClass.push("text-success");
      }
      else
      {
        enabledClass.push("fa-minus-circle");
        enabledClass.push("text-danger");
      }

      return (
        <div className="card my-4">
          <div className="card-body">
            
            <h5 className="card-title">{this.props.data.productCode}&nbsp;
              <i className={enabledClass.join(' ')} data-bs-toggle="tooltip" data-bs-placement="top" title={this.props.data.active ? 'Active' : 'Disabled'}></i>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">Product ID {this.props.data.accountId}</h6>
            <p className="card-text">{this.props.data.description}</p>
            <span className="badge bg-secondary">{this.props.data.extension}</span>
            
          </div>
        </div>
    );
    }
}
  
export default ProductListItem;