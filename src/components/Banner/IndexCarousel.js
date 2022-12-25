import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { IndexLists, NFTsList, TrendingCoins, TrendingNFTs } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

const IndexCarousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();
 
  const fetchTrendingindex = async () => {
    const { data } = await axios.get(IndexLists());
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingindex();
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

  const items = trending.map((Indexes) => {
 
    return (
      <Link className={classes.carouselItem} to={`/Indexes/${Indexes.id}`}>
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
          {Indexes?.id}
  
        </span>
        <span  style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                
                              }}>
          {Indexes?.market}
  
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
        {Indexes?.last}
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

export default IndexCarousel;
