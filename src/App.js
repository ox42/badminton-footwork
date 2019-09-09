import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            speed: 2000,
            position: 0,
            lastDrawing: null,

            circlePointerStyle: { width: '100%' }
        };

        this.containerInterval = null;
        this.courtRef = React.createRef();
        this.courtPointerRef = React.createRef();
    }

    componentDidMount() {
        this.containerInterval = setInterval(() => { this.updateScreen(); }, 100);
    }

    componentWillUnmount() {
        if (this.containerInterval) {
            clearInterval(this.containerInterval);
        }
    }


    updateScreen() {

        const courtNode = this.courtRef.current;
        this.setState({ circlePointerStyle: { width: courtNode.clientWidth } });


        if (!this.state.lastDrawing || (new Date().getTime() - this.state.lastDrawing.getTime() >= this.state.speed)) {
            let newPosition = Math.floor(Math.random() * 8);
            this.setState({ position: newPosition, lastDrawing: new Date() });
        }

    }

    render() {
        return (
            <div className="App">

                <button className="speed-button speed-button-plus" onClick={() => { this.setState({ speed: Math.max(Math.round(this.state.speed / 1.1), 500) })}}>Fast</button>
                <button className="speed-button speed-button-minus" onClick={() => { this.setState({ speed: Math.min(Math.round(this.state.speed * 1.1), 10000) })}}>Slow</button>

                <div className={"court-container court-position-" + this.state.position}>

                    <img className="court" src='/badminton-side.jpg' ref={this.courtRef} />

                    <div ref={this.courtPointerRef} style={this.state.circlePointerStyle} className={"circle-pointer circle-" +
                    ((this.state.lastDrawing && (new Date().getTime() - this.state.lastDrawing.getTime() <= Math.max(1500, 2 * this.state.speed / 3))) ? 'visible' : 'invisible')}>

                        <div className="circle-element pulse"></div>
                        <img src="/right-arrow.png" className="arrow-element"></img>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
