import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import MarqueeDouble from './MarqueeDouble';
import '../../resource/App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const propTypes = {};
const defaultProps = {};
class MusicInfo extends Component {
    constructor(props) {
        super(props);
        this.titleMarquee;
        this.artistMarquee;
        this.singleArtist;
        this.singleTitle;
        this.state = {
            overflow: {
                title: false,
                artist: false
            },
            setOverFlow: false
        };
        window.onresize = () => {
            this.setState({setOverFlow: false});
        }
    }
    setFlow() {
        const titleWidth = ReactDOM.findDOMNode(this.singleTitle).offsetWidth;
        const artistWidth = ReactDOM.findDOMNode(this.singleArtist).offsetWidth;
        const viewPortWidth = window.innerWidth || document.body.clientWidth;
        console.info(this.singleTitle);
        console.info(ReactDOM.findDOMNode(this.singleTitle));
        console.info("viewPortWidth : " + viewPortWidth);
        console.info("titleWidth : " + titleWidth);
        let titleOverflow;
        let artistOverflow;
        // 곡 제목의 길이가, 뷰포트 너비보다 길면 flow시킨다.
        if (titleWidth > viewPortWidth) {
            titleOverflow = true;
        } else {
            titleOverflow = false;
        }
        // 음악가의 길이가, 뷰포트 너비보다 길면 flow시킨다.
        if (artistWidth > viewPortWidth) {
            artistOverflow = true;
        } else {
            artistOverflow = false;
        }
        console.info("artist = " + artistOverflow + ", title = " + titleOverflow)
        // 비동기 메서드
        this.setState({
            overflow: {
                title: titleOverflow,
                artist: artistOverflow
            }
        });
        // 설정을 완료했음을 설정
        this.setState({setOverFlow: true});
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.title !== nextProps.title) {
            this.setState({setOverFlow: false});
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.overflow.title != nextState.overflow.title) {
            return true;
        }
        if (this.state.overflow.artist != nextState.overflow.artist) {
            return true;
        }
        if (this.props.title !== nextProps.title) {
            return true;
        }
        return false;
    }
    componentDidUpdate() {
        if (!this.state.setOverFlow) {
            this.setFlow();
        }
    }
    componentDidMount() {
        if (!this.state.setOverFlow) {
            this.setFlow();
        }
        console.log("fuck");
    }
    render() {
        console.info("MusicInfo rensder");
        const singleTitle = (
            <h1 className='Marquee-content' key={this.props.title} ref= {(ref) => {this.singleTitle = ref;} }>
                {this.props.title}</h1>
        );
        const singleArtist = (
            <h1 className='Marquee-content' key={this.props.artist} ref= {(ref) => {this.singleArtist = ref;} }>
                {this.props.artist}</h1 >
        );
        const value = (
            <span className="example" key={this.props.title}>{this.props.title}</span>
        );
        return (
            <div className='MusicInfo'>
                <div className="MusicInfo-Content-Container">
                    <ReactCSSTransitionGroup transitionName="movingDown" transitionEnterTimeout={3000} transitionLeaveTimeout={500}>
                        <div key={this.props.artist} className="MusicInfo-artist">
                            {this.state.overflow.artist
                                ? (
                                    <MarqueeDouble step={1} interval={33} ref= {(ref => {this.artistMarquee = ref})} autoStart={true} onStart= {() => { if (this.titleMarquee != undefined) { this.artistMarquee.stop(); this.titleMarquee.delay(); } else { this.artistMarquee.delay(); } }}>{singleArtist}</MarqueeDouble>
                                )
                                : singleArtist}
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
                <ReactCSSTransitionGroup transitionName="movingDown" transitionEnterTimeout={3000} transitionLeaveTimeout={500}>
                    <div key={this.props.title} className="MusicInfo-title">{this.state.overflow.title
                            ? (
                                <MarqueeDouble step={1} interval={33} ref= {(ref => {this.titleMarquee = ref})} autoStart={!this.state.overflow.artist} onStart= {() => { if (this.artistMarquee != undefined) { this.titleMarquee.stop(); this.artistMarquee.delay(); } else { this.titleMarquee.delay(); } }}>{singleTitle}</MarqueeDouble>
                            )
                            : singleTitle}
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
MusicInfo.propTypes = propTypes;
MusicInfo.defaultProps = defaultProps;
export default MusicInfo;
