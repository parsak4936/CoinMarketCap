import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { NFTsList, TrendingCoins, TrendingNFTs } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

const NftCarousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
 
  const fetchTrendingNfts = async () => {
    const { data } = await axios.get(NFTsList(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingNfts();
   }, [currency]);

  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      direction:"rtl",
      fontFamily:"irs",
      alignItems: "center",
    },
    carouselItem: {
      direction:"rtl",
      fontFamily:"irs",

      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));

  const classes = useStyles();

  const items = trending.map((nft) => {
    let profit = nft?.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/nfts/${nft.id}`}>
        {/* <img
          src={nft?.image}
          alt={nft.name}
          height="80"
          style={{ marginBottom: 10 }}
        /> */}
        <span  style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                
                              }}>
          {nft?.id}
  
        </span>
        <span  style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                
                              }}>
          {nft?.symbol}
  
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
        {nft?.asset_platform_id}
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

export default NftCarousel;
