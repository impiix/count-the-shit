import React, {Component} from "react";

const API_URI = 'http://count.loc:3000/score';

class Score extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            highscore: []
        }
    }

    componentDidMount() {
        this.fetchFromApi()
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.playing !== prevProps.playing) {
            this.fetchFromApi()
        }
    }

    fetchFromApi()
    {
        fetch(API_URI)
            .then(response => response.json())
            .then(data => this.setState({highscore: data}))
    }

    render() {
        return (
        <div className="score">
            <small>
                <table className="table table-striped">
                    <tr>
                        <th>
                            Score history
                        </th>
                    </tr>
                    <tbody>
                    {
                        this.state.highscore.map((item) => (
                            <tr>
                                <td>
                                    {item.user}
                                </td>
                                <td>
                                    {item.score}
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </small>
        </div>
        )
    }
}

export default Score;
