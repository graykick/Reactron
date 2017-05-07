import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Progress from './Progress';
import Marquee from './Marquee'
import MarqueeDouble from 'react-marquee-double'

import '../App.css';

const propTypes = {};
const defaultProps = {};
class MusicPlay extends Component {
    constructor(props) {
        super(props);

        this.counter;
        this.titleMarquee;
        this.artistMarquee;
        this.singleArtist;
        this.singleTitle;

        this.state = {
            title: "I don't Wanna Live Forever (Fifty Shades Darker)",
            album: "default album",
            artist: "Taylor Swift & ZAYN",
            overflow: {
                title: false,
                artist: false
            },
            setOverFlow: false,
            isPlaying: true,
            position: 0,
            current: 0,
            total: 2000,
            currentTotal: 2000,
            position: 0
        }

        window.onresize = () => {
            this.setState({setOverFlow: false})
        }

        this.increaseTime = this.increaseTime.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
    }

    handlePlay(event) {
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    secondToHms(d) {
        d = Number(d);

        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);

        return ((h > 0
            ? h + ':' + (m < 10
                ? '0'
                : '')
            : '') + m + ':' + (s < 10
            ? '0'
            : '') + s);
    }

    increaseTime() {
        if (this.state.current < this.state.total && this.state.isPlaying) {
            this.setState({
                current: this.state.current + 1,
                position: ((this.state.current + 1) / this.state.total),
                currentTotal: this.state.currentTotal - 1
            })
        }
    }

    setFlow() {
        const titleWidth = ReactDOM.findDOMNode(this.singleTitle).offsetWidth;
        const artistWidth = ReactDOM.findDOMNode(this.singleArtist).offsetWidth;
        const viewPortWidth = window.innerWidth || document.body.clientWidth;

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
            <h1 className='Marquee-content' ref= {(ref) => {this.singleTitle = ref;}}>{this.state.title}</h1>
        );
        const singleArtist = (
            <h1 className='Marquee-content' ref= {(ref) => {this.singleArtist = ref}}>{this.state.artist}</h1>
        );
        return (
            <div className='MusicPlay-Div'>
                <div>
                    {this.state.overflow.artist
                        ? (
                            <MarqueeDouble step={1} interval={33} ref= {(ref => {this.artistMarquee = ref})} autoStart={true} onStart={() => {
                                if (this.titleMarquee != undefined) {
                                    this.artistMarquee.stop();
                                    this.titleMarquee.delay();
                                } else {
                                    this.artistMarquee.delay();
                                }
                            }}>
                                {singleArtist}
                            </MarqueeDouble>
                        )
                        : singleArtist
                    }
                </div>
                <div>
                    {this.state.overflow.title
                        ? (
                            <MarqueeDouble step={1} interval={33} ref= {(ref => {this.titleMarquee = ref})} autoStart={!this.state.overflow.artist} onStart={() => {
                                if (this.artistMarquee != undefined) {
                                    this.titleMarquee.stop();
                                    this.artistMarquee.delay();
                                } else {
                                    this.titleMarquee.delay();
                                    console.log("delay");
                                }
                            }}>
                                {singleTitle}
                            </MarqueeDouble>
                        )
                        : singleTitle
                    }
                </div>

                <Progress current={this.secondToHms(this.state.current / 10)} total={this.secondToHms(this.state.currentTotal / 10)} position={this.state.position} onClick={(event) => {
                    this.handlePlay(event)
                }}/>
            </div>
        );
    }
}
MusicPlay.propTypes = propTypes;
MusicPlay.defaultProps = defaultProps;
export default MusicPlay;
