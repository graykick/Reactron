import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {MarqueeDouble, Progress, FileInfo, MusicInfo} from '../components';
import '../resource/App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MPDClient from '../mpd/MPDClient';
const propTypes = {};
const defaultProps = {};
class MusicPlay extends Component {
    constructor(props) {
        super(props);
        this.remote = window.require('electron').remote;
        this.net = window.require('net');
        this.MPDClient = new MPDClient('localhost', 6600);
        this.statusClient = new MPDClient('localhost', 6600);
        this.counter;
        this.MPDClient;
        this.net;
        this.state = {
            title: "",
            artist: "",
            format: "",
            samplingRate: "",
            bit: "",
            songId: -1,
            animeDirection: "movingUp",
            isPlaying: true,
            position: 0,
            current: 0,
            total: 300,
            currentTotal: 300,
            position: 0
        }
        this.increaseTime = this.increaseTime.bind(this);
        this.getMPDStatus = this.getMPDStatus.bind(this);
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
            // this.setState({
            //     current: this.state.current + 1,
            //     position: ((this.state.current + 1) / this.state.total),
            //     currentTotal: this.state.currentTotal - 1
            // })
        }
    }
    getMPDStatus() {
        this.statusClient.sendCommand('status', (res) => {
            console.log(res);
            if (res.songid !== this.state.songId) {
                this.setSongData();
            }
            this.setState({
                current: Math.floor(res.elapsed),
                currentTotal: this.state.total - Math.floor(res.elapsed),
                position: Math.floor(res.elapsed) / this.state.total
                // songId: res.songid
            });
        });
    }
    setSongData() {
        this.MPDClient.sendCommand('status', (res) => {
            if(res.audio === undefined) {
                return;
            }
            console.info(res);
            const parseRes = res.audio.split(':');
            const samplingRate = Number(parseRes[0]) / 1000;
            const bit = parseRes[1];
            let animeDirection;
            console.info(res.songid);
            console.info(this.state.songId);
            if (Number(this.state.songId) < Number(res.songid)) {
                console.info("up")
                animeDirection = "movingUp";
            } else {
                console.info("down")
                animeDirection = "movingDown";
            }
            this.setState({bit: bit, samplingRate: samplingRate, songId: res.songid, animeDirection: animeDirection})
        });
        this.MPDClient.sendCommand('currentsong', (res) => {
            console.info(res);
            if(res.file === undefined) {
                return;
            }
            const format = res.file.split('.')[1];
            this.setState({title: res.Title, artist: res.Artist, total: res.Time, currentTotal: res.Time, format: format});
        });
    }
    componentWillMount() {
        this.setSongData();
        //this.counter = setInterval(this.increaseTime, 500);
        this.getMPDStatusHandler = setInterval(this.getMPDStatus, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.counter);
    }
    render() {
        console.info("at render : " + this.state.animeDirection);
        return (
            <div className='MusicPlay-Div'>
                <MusicInfo title={this.state.title} artist={this.state.artist}/>
                <FileInfo bit={this.state.bit} samplingRate={`${this.state.samplingRate} kHz`} format={this.state.format}></FileInfo>
                <Progress current={this.secondToHms(this.state.current)} total={this.secondToHms(this.state.currentTotal)} position={this.state.position}/>
            </div>
        );
    }
}
MusicPlay.propTypes = propTypes;
MusicPlay.defaultProps = defaultProps;
export default MusicPlay;
