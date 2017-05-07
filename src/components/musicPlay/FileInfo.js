import React, {Component, PropTypes} from 'react';
const propTypes = {
    bit: React.PropTypes.string,
    samplingRate: React.PropTypes.string,
    format: React.PropTypes.string
};

const defaultProps = {
    bit: '24',
    samplingRate: '4440000',
    format: 'MP3'
};
class FileInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='FileInfo-div'>
                <span className='FileInfo-bit'>{this.props.bit}</span>
                <span className='FileInfo-samplingRate'>{this.props.samplingRate}</span>
                <span className='FileInfo-format'>{this.props.format}</span>
            </div>
        );
    }
}
FileInfo.propTypes = propTypes;
FileInfo.defaultProps = defaultProps;
export default FileInfo;
