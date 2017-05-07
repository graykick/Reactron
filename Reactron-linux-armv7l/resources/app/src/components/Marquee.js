import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

const defaultPropsFunc = (funcName) => {
    return () => {
        console.warn(`${funcName} is not defined`);
    }
}

const propTypes = {
    loop: React.PropTypes.bool,
    double: React.PropTypes.bool,
    doubleSpace: React.PropTypes.number,
    step: React.PropTypes.number,
    action: React.PropTypes.string,
    count: React.PropTypes.number,
    onStart: React.PropTypes.func,
    onBounce: React.PropTypes.func,
    onEnd: React.PropTypes.func,
    interval: React.PropTypes.number,
    direction: React.PropTypes.string,
    startPosition: React.PropTypes.string,
    endPosition: React.PropTypes.string
};

const defaultProps = {
    loop: true,
    double: true,
    doubleSpace: 100,
    step: 6,
    action: "init",
    count: -1,
    onStart: defaultPropsFunc("onStart"),
    onBounce: defaultPropsFunc("onBounce"),
    onEnd: defaultPropsFunc("onEnd"),
    interval: 30,
    direction: "left",
    startPosition: "left",
    endPosition: "outLeft"
};

class Marquee extends Component {
    constructor(props) {
        super(props);

        this.mover;
        this.container;
        this.containerNode;
        this.moverDiv;
        this.moverDivNode;
        this.single;
        this.singleNode;

        this.state = {
            left: 0,
            singleWidth: -1,
            moverWidth: -1,
            containerWidth: -1,
            count: -1
        };

        this.actionFunc = {
            init: () => {
                this.setState({left: 0});
            },
            countinue: () => {}
        };

        this.moveTo = {
            left: () => {
                this.setState({left: 0})
            },
            outLeft: () => {
                this.setState({
                    left: -this.state.singleWidth
                })
            },
            center: () => {
                this.setState({
                    left: (this.state.moverWidth - this.state.singleWidth) / 2
                })
            },
            right: () => {
                console.log("right" + this.state.containerWidth);
                this.setState({left: 0})
            }
        };

        this.direction = {
            left: () => {
                this.setState({
                    left: this.state.left - this.props.step
                })
            },
            right: () => {
                this.setState({
                    left: this.state.left + this.props.step
                })
            }
        };

        this.move = this.move.bind(this);
    }

    start() {
        this.mover = setInterval(this.move, 100);
    }

    stop() {
        clearInterval(this.mover);
    }

    init() {
        this.actionFunc.init();
    }

    // text-align으로인한 left의 offser때문에 필요
    leftConvert(left) {}

    move() {
        const {left, singleWidth, moverWidth, containerWidth} = this.state;
        const {
            step,
            action,
            onStart,
            onEnd,
            double,
            direction,
            endPosition,
            doubleSpace
        } = this.props;
        this.setState({singleWidth: this.singleNode.offsetWidth});

        console.log(this.state.singleWidth);

        // 이벤트 발생
        if (Math.abs(left) == 0) {
            onStart();
        } else if (left < -singleWidth || left > containerWidth) {
            this.moveTo[direction]();
            //console.log(left);
            onEnd();
            return;
        }

        // onBounce Action 처리 (init or nothing)
        if (double && ((left - step) > moverWidth / 2 || (left - step) > (moverWidth - doubleSpace * 2) / 2)) {
            console.log("in if");
            // this.stop();
            this.moveTo[direction]();
            return;
        }

        // left 변경(move)
        this.moverDivNode.style.left = `${left - step}px`;

        this.direction[direction]();
    }

    componentDidMount() {
        console.log("did monut");
        const {interval, double} = this.props;
        ReactDOM.findDOMNode(this.single).style.display = "inline-block";
        this.singleNode = ReactDOM.findDOMNode(this.single);
        this.moverDivNode = ReactDOM.findDOMNode(this.moverDiv);
        this.containerNode = ReactDOM.findDOMNode(this.container);

        const singleWidth = this.singleNode.offsetWidth;
        console.log("single width = " + singleWidth);

        if (double) {
            this.moverDivNode.style.width = `${singleWidth * 2}px`;
            this.containerNode.style.width = `${singleWidth * 2}px`;
        } else {
            this.moverDivNode.style.display = "inline-block";
        }

        const moverWidth = this.moverDivNode.offsetWidth;
        const containerWidth = this.containerNode.offsetWidth;
        console.log("container width = " + moverWidth);
        this.setState({singleWidth: singleWidth, moverWidth: moverWidth, containerWidth: containerWidth});
        this.mover = setInterval(this.move, interval);
    }

    componentWillUnmount() {
        clearInterval(this.mover);
    }

    render() {
        const {double, doubleSpace, direction} = this.props;
        const style = {
            paddingRight: (double)
                ? `${doubleSpace}px`
                : 0
        }

        const single = (
            <span className="Marquee-Child-Single" style={style} ref= {(ref => {this.single = ref})}>{this.props.children}</span>
        );

        return (
            <div className="MarqueeC-Div" ref={(ref) => {
                this.container = ref
            }}>
                <div className="Marquee-Mover" ref={(ref) => {
                    this.moverDiv = ref
                }}>
                    {/*}{single}
                    {double
                        ? (
                            <td>{single}</td>
                        )
                        : null} */}
                    <table className="Marquee-Table">
                        <tr>
                            <td>
                                {single}
                            </td>
                            {double
                                ? (
                                    <td>{single}</td>
                                )
                                : null}
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}
Marquee.propTypes = propTypes;
Marquee.defaultProps = defaultProps;
export default Marquee;
