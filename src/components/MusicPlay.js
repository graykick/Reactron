import React, {Component, PropTypes} from 'react';
import Progress from './Progress';
import '../App.css';

const propTypes = {};
const defaultProps = {};
class MusicPlay extends Component {
    constructor(props) {
        super(props);

        this.counter;

        this.state = {
            title: "I don't wanna live forever I don't wanna live foreverI don't wanna live forever",
            album: "default album",
            artist: "Taylor Swift & ZAYN Taylor Swift & ZAYN Taylor Swift & ZAYN",
            totalTime: 10,
            overflow: {
                title: false,
                artist: false
            },
            setOverFlow: false,
            isPlaying: true,
            position: 0,
            current: 0,
            total: -1
        }

        window.onresize = () => {
            this.setState({setOverFlow: false})
        }

        this.increaseTime = this.increaseTime.bind(this);

    }

    increaseTime() {
        console.log("in");
        if(this.state.current < 1 && this.state.isPlaying) {
            this.setState({
                current: this.state.current + 0.001
            })
            console.log("up");
        }
    }

    setFlow() {
        console.log("set flow")
        console.log(this);
        let titleWidth = document.getElementById("Music-Title").offsetWidth;
        let artistWidth = document.getElementById("Music-Artist").offsetWidth;
        let viewPortWidth = window.innerWidth || document.body.clientWidth;

        let titleOverflow;
        let artistOverflow;

        console.log(titleWidth + ", " + viewPortWidth);

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

        // 비동기 메서드
        this.setState({
            overflow: {
                title: titleOverflow,
                artist: artistOverflow
            }
        });

        if (titleOverflow && artistOverflow) {
            // title과 artist모두 overflow라면 다른 marquee keyframes적용
            // title 설정
            document.getElementById("Music-Title").style.paddingRight = "80px";
            titleWidth = document.getElementById("Music-Title").offsetWidth;
            document.getElementById("flowTextContainer-Title").style.width = (titleWidth * 2) + "px";
            document.getElementById("flowText-H1-Title").style.width = (titleWidth * 2) + "px";
            document.getElementById("flowTextContainer-Title").style.animation = "marqueeTitle 30s linear infinite";

            // artist 설정
            document.getElementById("Music-Artist").style.paddingRight = "80px";
            artistWidth = document.getElementById("Music-Artist").offsetWidth;
            document.getElementById("flowTextContainer-Artist").style.width = (artistWidth * 2) + "px";
            document.getElementById("flowText-H1-Artist").style.width = (artistWidth * 2) + "px";
            document.getElementById("flowTextContainer-Artist").style.animation = "marqueeArtist 30s linear infinite";
        } else if (titleOverflow) {
            // title만 overflow
            document.getElementById("Music-Title").style.paddingRight = "80px";
            titleWidth = document.getElementById("Music-Title").offsetWidth;
            document.getElementById("flowTextContainer-Title").style.width = (titleWidth * 2) + "px";
            document.getElementById("flowText-H1-Title").style.width = (titleWidth * 2) + "px";
            document.getElementById("flowTextContainer-Title").style.animation = "marquee 15s linear infinite";

            // artist에서 animation등 제거
            document.getElementById("Music-Artist").style.paddingRight = "0";
            document.getElementById("flowTextContainer-Artist").style.width = "auto";
            document.getElementById("flowText-H1-Artist").style.width = "auto";
            document.getElementById("flowTextContainer-Artist").style.animation = "";
        } else if (artistOverflow) {
            // artist만 overflow
            document.getElementById("Music-Artist").style.paddingRight = "80px";
            artistWidth = document.getElementById("Music-Artist").offsetWidth;
            document.getElementById("flowTextContainer-Artist").style.width = (artistWidth * 2) + "px";
            document.getElementById("flowText-H1-Artist").style.width = (artistWidth * 2) + "px";
            document.getElementById("flowTextContainer-Artist").style.animation = "marquee 15s linear infinite";

            // title에서 animation등 제거
            document.getElementById("Music-Title").style.paddingRight = "0";
            document.getElementById("flowTextContainer-Title").style.width = "auto";
            document.getElementById("flowText-H1-Title").style.width = "auto";
            document.getElementById("flowTextContainer-Title").style.animation = "";
        } else {
            // artist에서 animation등 제거
            document.getElementById("Music-Artist").style.paddingRight = "0";
            document.getElementById("flowTextContainer-Artist").style.width = "auto";
            document.getElementById("flowText-H1-Artist").style.width = "auto";
            document.getElementById("flowTextContainer-Artist").style.animation = "";

            // title에서 animation등 제거
            document.getElementById("Music-Title").style.paddingRight = "0";
            document.getElementById("flowTextContainer-Title").style.width = "auto";
            document.getElementById("flowText-H1-Title").style.width = "auto";
            document.getElementById("flowTextContainer-Title").style.animation = "";
        }

        // 설정을 완료했음을 설정
        this.setState({setOverFlow: true});

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

        this.counter = setInterval(this.increaseTime, 100);
    }

    componentWillUnmount() {
        clearInterval(this.counter);
    }

    render() {
        const singleTitle = (
            <span className="flowText" id="Music-Title">{this.state.title}</span>
        );
        const singleArtist = (
            <span className="flowText" id="Music-Artist">{this.state.artist}</span>
        )
        return (
            <div className="MusicPlay-Div">
                <h1 className="flowText-H1" id="flowText-H1-Title">
                    <div className="flowTextContainer" id="flowTextContainer-Title">
                        {singleTitle}
                        {this.state.overflow.title
                            ? singleTitle
                            : ""}
                    </div>
                </h1>
                <h1 className="flowText-H1" id="flowText-H1-Artist">
                    <div className="flowTextContainer" id="flowTextContainer-Artist">
                        {singleArtist}
                        {this.state.overflow.artist
                            ? singleArtist
                            : ""}
                    </div>
                </h1>
                <Progress current={this.state.current} end={this.state.end}/>
            </div>
        );
    }
}
MusicPlay.propTypes = propTypes;
MusicPlay.defaultProps = defaultProps;
export default MusicPlay;
