import { Component } from 'react';

class BootstrapAlert extends Component {
    render() {
        let className = `alert alert-${this.props.alertType}`;

        let titleHtml = null;
        if (this.props.title) {
            titleHtml = (<h4 className="alert-heading">{this.props.title}</h4>)
        }

        return (
            <div className={className} placeholder="BootstrapAlert">
                {titleHtml}
                {this.props.content}
            </div>
        )
    }
}

export default BootstrapAlert;