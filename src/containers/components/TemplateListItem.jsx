import { Component } from 'react';
import { Link } from "react-router-dom";
import { baseApiUrl } from '../App';

class TemplateListItem extends Component {
    /*
    This component represents a single Template item, when displayed in a list.
    */
    constructor(props) {
      super(props);
      this.state = { templateData: props.templateData, lastResponseCode: null };

      this.handleDelete = this.handleDelete.bind(this);
    }
  
    handleDelete() {
      console.log("time to delete a template");
      console.log(this.state.templateData);

      let id = this.state.templateData.id;
      fetch(`${baseApiUrl}/template/rds/delete?id=${id}`, {
        method: 'DELETE'
      })
        .then((response) => {
          console.log(`Response from server trying to delete with ID ${id}:`);
          console.log(response);
          this.props.onDelete();
      })
    }
  
    render() {
      let name = "No Name";
      if (this.props.templateData.name !== '') name = this.props.templateData.name;

      let enabledClass = ["fas"];
      if (this.props.templateData.active)
      {
        enabledClass.push("fa-check-circle");
        enabledClass.push("text-success");
      }
      else
      {
        enabledClass.push("fa-minus-circle");
        enabledClass.push("text-danger");
      }

      let globalReadClass = ["fas"];
      if (this.props.templateData.active)
      {
        globalReadClass.push("fa-eye");
        globalReadClass.push("text-primary");
      }
      else
      {
        globalReadClass.push("fa-eye-slash");
        globalReadClass.push("text-secondary");
      }

      return (
        <div className="card my-4">
          <div className="card-body">
            <Link to={`/local/templates/modify/${this.props.templateData.id}`} className="btn btn-primary float-end ms-1"><i className="fas fa-edit"></i></Link>
            <button className="btn btn-danger float-end" onClick={this.handleDelete}><i className="fas fa-trash-alt"></i></button>
            
            <h5 className="card-title">{name}&nbsp;
              <i className={enabledClass.join(' ')} data-bs-toggle="tooltip" data-bs-placement="top" title={this.props.templateData.active ? 'Active' : 'Disabled'}></i>
              &nbsp;
              {/* <i className={globalReadClass.join(' ')} data-bs-toggle="tooltip" data-bs-placement="top" title={this.props.templateData.active ? 'Global Read' : 'No Global Read'}></i> */}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">Account ID {this.props.templateData.accountId}</h6>
            <p className="card-text">{this.props.templateData.text}</p>
            <span className="badge bg-secondary">{this.props.templateData.extension}</span>
            
          </div>
        </div>
    );
    }
}
  
export default TemplateListItem;