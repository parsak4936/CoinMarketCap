import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import {
  ExchangeLists,
  IndexLists,
  NFTsList,
  TrendingCoins,
  TrendingNFTs,
} from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

const ExchangeCarousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
  //  console.log(trending):
  //  {
  //     "id": "gdax",
  //     "name": "Coinbase Exchange",
  //     "year_established": 2012,
  //     "country": "United States",
  //     "description": "",
  //     "url": "https://www.coinbase.com",
  //     "image": "https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1621471875",
  //     "has_trading_incentive": false,
  //     "trust_score": 10,
  //     "trust_score_rank": 1,
  //     "trade_volume_24h_btc": 24305.228238602172,
  //     "trade_volume_24h_btc_normalized": 24305.228238602172
  //   },
  const fetchTrendingindex = async () => {
    const { data } = await axios.get(ExchangeLists());
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingindex();
  }, [currency]);

  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      direction: "rtl",
      fontFamily: "irs",
      alignItems: "center",
    },
    carouselItem: {
      direction: "rtl",
      fontFamily: "irs",

      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));

  const classes = useStyles();

  const items = trending.map((Exchanges) => {
    return (
      <Link className={classes.carouselItem} to={`/Exchanges/${Exchanges.id}`}>
        <img
          src={Exchanges?.image}
          alt={Exchanges.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span
          style={{
            textTransform: "uppercase",
            fontSize: 22,
          }}
        >
          {Exchanges?.id}
        </span>
        <span
          style={{
            textTransform: "uppercase",
            fontSize: 22,
          }}
        >
          {Exchanges?.country}
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {Exchanges?.year_established}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default ExchangeCarousel;
