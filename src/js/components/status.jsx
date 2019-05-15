import React, {Component} from "react";

class Status extends React.Component {
    render() {
        return (
        <div>
        {this.props.playing ? 'Count!' : ''}
    </div>
    );
    }
}

export default Status;