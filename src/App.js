import React from 'react';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            speed: 2000,
            position: 0,
            lastDrawing: null,
            nextDrawing: null,

            circlePointerStyle: { width: '100%' }
        };

        this.containerInterval = null;
        this.courtRef = React.createRef();
        this.courtPointerRef = React.createRef();
    }

    componentDidMount() {
        this.containerInterval = setInterval(() => { this.updateScreen(); }, 30);
    }

    componentWillUnmount() {
        if (this.containerInterval) {
            clearInterval(this.containerInterval);
        }
    }


    updateScreen() {

        const courtNode = this.courtRef.current;
        this.setState({ circlePointerStyle: { width: courtNode.clientWidth, height: courtNode.clientHeight } });

        if (!this.state.lastDrawing || (this.state.nextDrawing.getTime() <= new Date().getTime())) {

            let randomDelay = Math.floor(Math.min(this.state.speed * 0.25, 2000) * Math.random());
            let timeLastDrawing = new Date();
            let timeNextDrawing = new Date((timeLastDrawing.getTime()) + this.state.speed + randomDelay);

            let newPosition = Math.floor(Math.random() * 8); //there are 8 important points on badminton court
            this.setState({ position: newPosition, lastDrawing: timeLastDrawing, nextDrawing: timeNextDrawing });
        }

        //rerender the progress bar on every tick
        this.forceUpdate();
    }

    render() {
        return (
            <div className="App">

                <button className="speed-button speed-button-plus" onClick={() => { this.setState({ speed: Math.max(Math.round(this.state.speed / 1.1), 500) })}}>Fast</button>
                <button className="speed-button speed-button-minus" onClick={() => { this.setState({ speed: Math.min(Math.round(this.state.speed * 1.1), 10000) })}}>Slow</button>

                <div className={"court-container court-position-" + this.state.position}>

                    <img className="court" alt="court" src='/badminton-side.jpg' ref={this.courtRef} />

                    <div ref={this.courtPointerRef} style={this.state.circlePointerStyle} className={"circle-pointer circle-" +
                    ((this.state.lastDrawing && (new Date().getTime() - this.state.lastDrawing.getTime() <= Math.max(1200, 2 * this.state.speed / 3))) ? 'visible' : 'invisible')}>

                        <div className="circle-element pulse"></div>
                        <img alt="arrow" src="/right-arrow.png" className="arrow-element"></img>

                        <div className="timer-element" style={{ visibility: (((!this.state.nextDrawing) || (this.state.nextDrawing.getTime() - new Date().getTime() >= 1500))) ? 'hidden' : 'visible' }}>
                            <div className="timer-element-percentage" style={{ height: (((!this.state.nextDrawing) || (this.state.nextDrawing.getTime() - new Date().getTime() >= 1000))) ? 0 : Math.round(100 - ((this.state.nextDrawing.getTime() - new Date().getTime()) / 1000.0) * 100) + '%' }}></div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
