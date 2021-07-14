import { Component } from "react";

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 42,
    };
  }
  incrementCounter = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  render() {
    let { count } = this.state;
    return (
      <>
        <div>
          <h2 className="counter">{count}</h2>
        </div>
        <button className="counter-button" onClick={this.incrementCounter}>
          Click
        </button>
        <style>{`
                    .counter-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:  #585858;
                    }
                `}</style>
      </>
    );
  }
}
