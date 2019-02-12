'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Number = function (_React$Component) {
    _inherits(Number, _React$Component);

    function Number() {
        _classCallCheck(this, Number);

        return _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).apply(this, arguments));
    }

    _createClass(Number, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: { "padding": '5px', "animationDuration": "25s", "animationName": "slidein", "width": "100px", "float": "left" } },
                this.props.value
            );
        }
    }]);

    return Number;
}(React.Component);

var Status = function (_React$Component2) {
    _inherits(Status, _React$Component2);

    function Status() {
        _classCallCheck(this, Status);

        return _possibleConstructorReturn(this, (Status.__proto__ || Object.getPrototypeOf(Status)).apply(this, arguments));
    }

    _createClass(Status, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.props.value ? 'Lost!' : ''
            );
        }
    }]);

    return Status;
}(React.Component);

var Game = function (_React$Component3) {
    _inherits(Game, _React$Component3);

    function Game(props) {
        _classCallCheck(this, Game);

        var _this3 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

        _this3.state = {
            numbers: [],
            timers: [],
            lost: false,
            score: 0
        };
        return _this3;
    }

    _createClass(Game, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.start();
            this.nameInput.focus();
        }
    }, {
        key: 'start',
        value: function start() {
            var time = 4000;
            var timer = setInterval(this.tick.bind(this), time);
            this.setState({
                timer: timer,
                lost: false,
                score: 0
            });
        }
    }, {
        key: 'tick',
        value: function tick() {
            var numbers = this.state.numbers;
            var time = new Date().getTime();
            var timeout = numbers.some(function (a) {
                return a.started + a.ttl < time;
            });
            if (timeout) {
                clearInterval(this.state.timer);
                this.setState({
                    lost: true,
                    numbers: []
                });

                return;
            }
            var ttl = 10000;
            var generated = generateNumbers(ttl);

            numbers.push(generated);
            this.setState({
                numbers: numbers
            });
        }
    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(event) {
            if (event.key === 'Enter') {
                var value = parseInt(event.target.value);
                event.target.value = "";
                var hit = this.state.numbers.filter(function (a) {
                    return a.result === value;
                }).length;

                var numbers = this.state.numbers.map(function (a) {
                    return a.result !== value ? null : a;
                });
                this.setState({
                    numbers: numbers,
                    score: this.state.score + hit
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return React.createElement(
                'div',
                { className: 'game' },
                React.createElement(
                    'div',
                    null,
                    'Score: ',
                    this.state.score
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(Status, { value: this.state.lost })
                ),
                React.createElement(
                    'div',
                    null,
                    this.state.lost && React.createElement(
                        'button',
                        { className: 'btn btn-lg btn-outline-secondary', onClick: this.start.bind(this) },
                        'Restart'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'game-board' },
                    this.state.numbers.map(function (item) {
                        return React.createElement(Number, { key: item.started, value: item.operation });
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'game-info' },
                    React.createElement('input', {
                        className: '',
                        onKeyPress: this.handleKeyPress.bind(this),
                        ref: function ref(input) {
                            _this4.nameInput = input;
                        }
                    }),
                    React.createElement(
                        'button',
                        { className: 'btn btn-lg btn-outline-secondary' },
                        'Send'
                    )
                )
            );
        }
    }]);

    return Game;
}(React.Component);

// ========================================

ReactDOM.render(React.createElement(Game, null), document.getElementById("root"));

function generateNumbers(ttl) {
    var number1 = Math.floor(Math.random() * 100) % 50;
    var number2 = Math.floor(Math.random() * 100) % 50;
    var symbols = ['+', '-'];
    var symbolIndex = Math.floor(Math.random() * 10) % 2;
    var symbol = symbols[symbolIndex];
    var result = symbolIndex ? number1 - number2 : number1 + number2;
    var operation = number1 + ' ' + symbol + ' ' + number2;
    var time = new Date().getTime();

    return { operation: operation, result: result, started: time, ttl: ttl };
}