import React, {Component} from "react";


class Number extends React.Component {
    render() {
        return (
            <div className="number" style={{"animationDuration": this.props.ttl * 1.1 / 1000 + 's'}}>
        {!this.props.hit &&
        <span>{this.props.operation}</span>
        }
    </div>
    );
    }
}

export default Number;
