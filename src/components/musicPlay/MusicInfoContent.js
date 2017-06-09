import React, {Component, PropTypes} from 'react';
import MarqueeDouble from './MarqueeDouble';

const propTypes = {
    overflow: React.PropTypes.object,
    total: React.PropTypes.string,
    position: React.PropTypes.number
};
const defaultProps = {
    elapsed: 50,
    total: 100,
    position: 0.5
};
class MusicInfoContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div> {
              this.props.overflow.artist
                ? (<MarqueeDouble
                    step = {1}
                    interval = {33}
                    ref = {(ref => {this.artistMarquee = ref})}
                    autoStart = {true}
                    onStart = {() => {
                        if (this.titleMarquee != undefined) {
                            this.artistMarquee.stop();
                            this.titleMarquee.delay();
                        } else {
                            this.artistMarquee.delay();
                        }
                }}>{singleArtist}</MarqueeDouble>) :
                singleArtist}
            </div>
        );
    }
}
MusicInfoContent.propTypes = propTypes;
MusicInfoContent.defaultProps = defaultProps;
export default MusicInfoContent;
