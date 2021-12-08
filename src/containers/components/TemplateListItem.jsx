import { Component } from 'react';
import { Link } from "react-router-dom";

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
      fetch(`http://54.191.60.209:8090/BackendApi-1.0-SNAPSHOT/api/template/rds/delete?id=${id}`, {
        method: 'DELETE'
      })
        .then((response) => {
          console.log(`Response from server trying to delete with ID {id}:`);
          console.log(response);
          this.props.onDelete();
      })
    }
  
    render() {
      let name = "No Name";
      if (this.props.templateData.name !== '') name = this.props.templateData.name;
      return (
        <div className="card m-4">
          <div className="card-body">
            <Link to={`/local/templates/modify/${this.props.templateData.id}`} className="btn btn-primary float-end ms-1"><i className="fas fa-edit"></i></Link>

            <button className="btn btn-danger float-end" onClick={this.handleDelete}><i className="fas fa-trash-alt"></i></button>
            
            <h5 className="card-title">{name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Account ID {this.props.templateData.accountId}</h6>
            <p className="card-text">extension: {this.props.templateData.extension}</p>
            
          </div>
        </div>
    );
    }
}
  
export default TemplateListItem;