import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react"

class Clock2 extends React.Component {
    constructor(props) {
        super(props);
        console.log("LCM: constructor");
        this.state = {
            date: new Date().toLocaleTimeString()
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("LCM: shouldComponentUpdate");
        // console.log('OLD State: ', this.state.date);
        // console.log('NEXT State: ', nextState.date);
        // return false;
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("LCM: componentDidUpdate");
    }

    componentDidMount() {
        console.log("LCM: componentDidMount");

        this.interval = setInterval(() => {
            this.setState(
                {date: new Date().toLocaleTimeString()}
            )
            // console.log(this.state.date)
        }, 1000)
    }

    componentWillUnmount() {
        console.log("LCM: componentWillUnmount");

        clearInterval(this.interval);
    }

    render() {
        console.log("LCM: render");

        // 1 case - recoursion = error
        // this.setState() call method render !!! again & again
        // this.setState({
        //     date: new Date().toLocaleTimeString()
        // })
        // 2 case interval change // no effect
        // setInterval(() => {
        //     date = new Date().toLocaleTimeString();
        //     console.log(date)
        // }, 1000)
        return (
            <>
                Date: {this.state.date}
            </>
        )
    }
}

function Clock() {
    const [date, setDate] = useState(new Date().toLocaleTimeString());
    // setInterval(() => {
    //     setDate(new Date().toLocaleTimeString());
    //     console.log(date)
    // }, 1000)

    // Instead setInterval better to use HOOK:
    useEffect(() => {
        console.log("functional: componentDidMount");
        const interval = setInterval(() => {
            setDate(new Date().toLocaleTimeString());
            // console.log(date)
        }, 1000);
        return () => {
            console.log("functional: componentWillUnmount");
            clearInterval(interval);
        }
    }, [date])

    console.log("functional: render");
    return (
        <>
            Date: {date}
        </>
    )
}

function App() {
    const [clock, setClock] = useState(true);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                {clock && < Clock/>}
                <button onClick={() => setClock(!clock)}> show/hide Clock</button>
            </header>
        </div>
    );
}

export default App;
