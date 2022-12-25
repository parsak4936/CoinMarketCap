import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import Alert from "./components/Alert";
import NFTs from "./Pages/NFTs";
import NFTsPage from "./Pages/NFTsPage";
import Indexes from "./Pages/Indexes";
import IndexPage from "./Pages/IndexPage";
import Exchanges from "./Pages/Exchanges";
import ExchangePage from "./Pages/ExchangePage";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />

        <Route path="/NFTs" component={NFTs} exact />
        <Route path="/nfts/:id" component={NFTsPage} exact />
        {/* Derivatives */}
        <Route path="/Indexes" component={Indexes} exact />
        <Route path="/Indexes/:market/:id" component={IndexPage} exact />

        <Route path="/Exchanges" component={Exchanges} exact />
        <Route path="/Exchanges/:id" component={ExchangePage} exact />

      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
