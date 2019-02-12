'use strict';

class Number extends React.Component {
    render() {
        return (
            <div style={{"padding": '5px', "animationDuration": "25s", "animationName": "slidein", "width": "100px", "float": "left"}}>{this.props.value}</div>
        );
    }
}

class Status extends React.Component {
    render() {
        return (
            <div>
                {this.props.lost ? 'Lost!' : 'Count!'}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: [],
            timers: [],
            lost: false,
            score: 0
        };
    }

    componentDidMount() {
        this.start();
        this.nameInput.focus();
    }

    start() {
        let time = 4000;
        let timer = setInterval(this.tick.bind(this), time);
        this.setState({
            timer: timer,
            lost: false,
            score: 0
        });
    }

    tick() {
        let numbers = this.state.numbers;
        let time = new Date().getTime();
        let timeout = numbers.some(a => (a.started + a.ttl) < time);
        if (timeout) {
            clearInterval(this.state.timer);
            this.setState({
                lost: true,
                numbers: []
            });

            return;
        }
        let ttl = 10000;
        let generated = generateNumbers(ttl);

        numbers.push(generated);
        this.setState({
            numbers: numbers
        });
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
                <div><Status lost={this.state.lost}/></div>
                <div>
                    {this.state.lost &&
                    <button className="btn btn-lg btn-outline-secondary" onClick={this.start.bind(this)}>Restart</button>
                    }
                </div>
                <div className="game-board">
                    {
                        this.state.numbers.map((item) => (
                            <Number key={item.started} value={item.operation} />
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

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

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
