import React, {Component, PropTypes} from 'react';
const propTypes = {
    current: React.PropTypes.string,
    total: React.PropTypes.string,
    position: React.PropTypes.number
};
const defaultProps = {
    elapsed: 50,
    total: 100,
    position: 0.5
};
class Progress extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="progress">
                <span className="player__time-elapsed">{this.props.current}</span>
                <progress value={this.props.position} max="1"></progress>
                <span className="player__time-total">{this.props.total}</span>
            </div>
        );
    }
}
Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;
export default Progress;
