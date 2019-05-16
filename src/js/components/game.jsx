import React, {Component} from "react";
import Status from './status.jsx'
import Number from './number.jsx'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: [],
            playing: false,
            score: 0,
            baseTime: 4000
        };
    }

    componentDidMount() {
    }

    start() {
        this.setState({
            playing: true,
            score: 0
        });

        this.nameInput.focus();
        this.tick();
    }

    stop() {
        this.lost();
        clearTimeout(this.state.timeout);
    }

    tick() {
        let numbers = this.state.numbers;
        let time = new Date().getTime();
        let timeout = numbers.some(a => (a.started + a.ttl) < time && !a.hit);
        if (timeout) {
            this.lost();

            return;
        }

        let interval = 100;
        let ttl = 3 * this.state.baseTime - 6 * interval;
        let generated = generateNumbers(ttl);

        let index = numbers.findIndex(a => a.hit);
        if (index !== -1) {
            numbers.splice(index, 1, generated);
        } else {
            numbers.push(generated);
        }

        this.setState({
            numbers: numbers,
            baseTime: this.state.baseTime - interval
        });

        let definedTimeout = setTimeout(this.tick.bind(this), this.state.baseTime);

        this.setState({
            timeout: definedTimeout
        });

    }

    lost() {
        this.setState({
            playing: false,
            numbers: [],
            baseTime: 4000
        });
        fetch('http://localhost:3000/score',
            {
                method: 'POST',
                body: JSON.stringify({
                    score: this.state.score
                })
            })
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            const value = parseInt(event.target.value);
            event.target.value = "";
            const hit = this.state.numbers.filter(a => a.result === value).length;

            const numbers = this.state.numbers.map(a => {
                if (a.result === value) {
                    a.hit = true;
                }

                return a;
            });
            this.setState({
                numbers: numbers,
                score: this.state.score + hit
            })
        }
    }

    render() {

        return (
            <div className="game">
                <div>Score: {this.state.score}</div>
                <div><Status playing={this.state.playing}/></div>
                <div>
                    {!this.state.playing &&
                    <button className="btn btn-lg btn-outline-secondary" onClick={this.start.bind(this)}>Start</button>
                    }
                </div>
                <div>
                    {this.state.playing &&
                    <button className="btn btn-lg btn-outline-secondary" onClick={this.stop.bind(this)}>Stop</button>
                    }
                </div>
                <div className="game-board">
                    {
                        this.state.numbers.map((item) => (
                            <Number key={item.started} operation={item.operation} hit={item.hit} ttl={item.ttl} />
                        ))
                    }
                </div>
                <div className="game-info">
                    <input
                        className=""
                        onKeyPress={this.handleKeyPress.bind(this)}
                        ref={(input) => { this.nameInput = input; }}
                    />
                    <button className="btn btn-lg btn-outline-secondary">Send</button>
                </div>
            </div>
        );
    }
}


function generateNumbers(ttl)
{
    let number1 = Math.floor(Math.random() * 100) % 50;
    let number2 = Math.floor(Math.random() * 100) % 50;
    let symbols = ['+', '-'];
    let symbolIndex = Math.floor(Math.random() * 10) % 2;
    let symbol = symbols[symbolIndex];
    let result = symbolIndex ? number1 - number2 : number1 + number2;
    let operation = `${number1} ${symbol} ${number2}`;
    let time = new Date().getTime();

    return  {operation: operation, result: result, started: time, ttl: ttl, hit: false};
}

export default Game;