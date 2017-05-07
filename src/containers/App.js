import React, { Component, PropTypes } from 'react';
import MusicPlay from './MusicPlay';
import '../resource/App.css';


const propTypes = {
};
const defaultProps = {
};
class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className='appDiv'>
                <MusicPlay/>
            </div>
        );
    }
}
App.propTypes = propTypes;
App.defaultProps = defaultProps;
export default App;
