import React, { Component, PropTypes } from 'react';
import MusicPlay from './MusicPlay';
import PlayList from './PlayList';
import FileList from './FileList';
import '../App.css';


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
            <div>
                <MusicPlay/>
            </div>
        );
    }
}
App.propTypes = propTypes;
App.defaultProps = defaultProps;
export default App;
