import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { SingleCoin, SingleExchange } from "../config/api";

import { CryptoState } from "../CryptoContext";

const ExchangePage = () => {
  const { id } = useParams();
  const [Exchangesdata, setExchanges] = useState();
  //   console.log(Exchangesdata):
  //   "name": "Coinbase Exchange",
  //   "year_established": 2012,
  //   "country": "United States",
  //   "description": "",
  //   "url": "https://www.coinbase.com",
  //   "image": "https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1621471875",
  //   "facebook_url": "https://www.facebook.com/coinbase/",
  //   "reddit_url": "",
  //   "telegram_url": "",
  //   "slack_url": "",
  //   "other_url_1": "",
  //   "other_url_2": "",
  //   "twitter_handle": "CoinbasePro",
  //   "has_trading_incentive": false,
  //   "centralized": true,
  //   "public_notice": "",
  //   "alert_notice": "",
  //   "trust_score": 10,
  //   "trust_score_rank": 1,
  //   "trade_volume_24h_btc": 24305.228238602172,
  //   "trade_volume_24h_btc_normalized": 24305.228238602172,
  //   "tickers": [
  //     {
  //       "base": "ZEC",
  //       "target": "USD",
  //       "market": {
  //         "name": "Coinbase Exchange",
  //         "identifier": "gdax",
  //         "has_trading_incentive": false
  //       },]
  const { currency, symbol, user, Exchanges } = CryptoState();

  const fetchExchange = async () => {
    const { data } = await axios.get(SingleExchange(id));

    setExchanges(data);
  };

  useEffect(() => {
    fetchExchange();
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "irs ",
    },
    description: {
      width: "100%",
      fontFamily: "irs ",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!Exchangesdata)
    return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={Exchangesdata?.image}
          alt={Exchangesdata?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {Exchangesdata?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {/* {ReactHtmlParser(Exchangesdata?.description.en.split(". ")[0])}. */}
          توضیحات بازار:
          {Exchangesdata?.description}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              سال تاسیس:
              {Exchangesdata?.year_established}
            </Typography>
            <Typography variant="h5" className={classes.heading}>
              نام
              {Exchangesdata?.name}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              اکانت توییتر :{Exchangesdata?.twitter_handle}
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "irs ",
              }}
            >
              {" "}
              ضریب اعتماد:
              {Exchangesdata?.trust_score}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              <a
                href={Exchangesdata?.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                لینک فیس بوک
              </a>
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "irs ",
              }}
            ></Typography>
          </span>
        </div>
      </div>
      {/* <ExchangeInfo Exchangesdata={Exchangesdata} /> */}
    </div>
  );
};

export default ExchangePage;
