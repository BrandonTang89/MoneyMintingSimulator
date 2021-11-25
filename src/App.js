import React from "react";
import "./App.css";
class MoneyDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2> My Money </h2>
        <h2>
          Passive Mint Rate: {Math.round(this.props.mintRate * 100) / 100}
        </h2>
        <p className="moneyDisplay">
          {Math.round(this.props.money * 100) / 100}
        </p>
      </div>
    );
  }
}

class CapitalProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="capitalProduct">
        <h3> {this.props.desc.name} </h3>
        {this.props.desc.benefit} monies/s
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p> Cost: {this.props.desc.cost} </p>
          <p> Owned: {this.props.desc.owned}</p>
        </div>
      </div>
    );
  }
}

class MoneyMintingSimulator extends React.Component {
  componentDidMount() {
    document.title="Money Minting Simulator";
  }
  constructor(props) {
    super(props);
    this.state = {
      money: 0,
      mintRate: 0,
      capitalProducts: {
        slaveArtist: {
          name: "Slave Artist",
          benefit: 0.01,
          cost: 10,
          owned: 0,
        },
        randomPrinter: {
          name: "Random Printer",
          benefit: 0.5,
          cost: 100,
          owned: 0,
        },
        mintingMachine: {
          name: "Minting Machine",
          benefit: 10,
          cost: 1000,
          owned: 0,
        },
        bitcoinMiner: {
          name: "Bitcoin Miner",
          benefit: 200,
          cost: 10000,
          owned: 0,
        },
      },
    };
    setInterval(() => {
      this.setState({
        money: this.state.money + this.state.mintRate,
      });

    }, 1000);
    this.updateCapitalProductsJSX();
  }

  updateCapitalProductsJSX() {
    var capitalProductsJSX = [];
    for (let productName in this.state.capitalProducts) {
      capitalProductsJSX.push(
        <div onClick={() => this.purchaseAttempt(productName)}>
          <CapitalProduct desc={this.state.capitalProducts[productName]} />
        </div>
      );
    }
    this.state.capitalProductsJSX = capitalProductsJSX;
  }
  purchaseAttempt(productName) {
    
    const product = this.state.capitalProducts[productName];
    if (product.cost > this.state.money) {
      console.log("Not enough money");
    } else {
      this.setState({
        money: this.state.money - product.cost,
        capitalProducts: {
          ...this.state.capitalProducts,
          [productName]: {
            ...product,
            owned: product.owned + 1,
          },
        },
        mintRate: this.state.mintRate + product.benefit,
      });

    }
    console.log(this.state.capitalProducts);

  }
  render() {
    this.updateCapitalProductsJSX(); // need to update capitalProductsJSX after product purchase
    return (
      <div>
        <h1> Money Minting Simulator </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="myMoney">
            <MoneyDisplay
              money={this.state.money}
              mintRate={this.state.mintRate}
            />

            <button
              className="moneyButton"
              onClick={() => {
                this.setState({ money: this.state.money + 1 });
              }}
            >
              Increment
            </button>
          </div>
          <div className="myShop">
            <h2 className="shopTitle"> Capital Shop </h2>

            <div style={{ overflow: "scroll", height: "400px" }}>
              {this.state.capitalProductsJSX}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MoneyMintingSimulator;
