import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { SingleNFT } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
 
const NFTsPage = () => {
  const { id } = useParams();
  const [nft, setnft] = useState();

  const { currency, symbol, user, setAlert, Nftwatchlist } = CryptoState();
  //   console.log(nft):
  //   {
  //     "id": "ethlings",
  //     "contract_address": "0x8a1abd2e227db543f4228045dd0acf658601fede",
  //     "asset_platform_id": "polygon-pos",
  //     "name": "Ethlings",
  //     "image": {
  //       "small": "https://assets.coingecko.com/nft_contracts/images/1572/small/ethlings.png?1663573092"
  //     },
  //     "description": "A universe of customizable NFTs.",
  //     "native_currency": "ethereum",
  //     "floor_price": {
  //       "native_currency": 0.01,
  //       "usd": 12.21
  //     },
  //     "market_cap": {
  //       "native_currency": 78.97,
  //       "usd": 96431
  //     },
  //     "volume_24h": {
  //       "native_currency": 0.002,
  //       "usd": 2.44
  //     },
  //     "floor_price_in_usd_24h_percentage_change": 903.05362,
  //     "number_of_unique_addresses": 1094,
  //     "number_of_unique_addresses_24h_percentage_change": 0.09149,
  //     "total_supply": 7897
  //   }
  const fetchNFT = async () => {
    const { data } = await axios.get(SingleNFT(id));

    setnft(data);
  };

  const inWatchlist = Nftwatchlist.includes(nft?.id);

  const addToWatchlist = async () => {
    const nftRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        nftRef,
        { nft: Nftwatchlist ? [...Nftwatchlist, nft?.id] : [nft?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${nft.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const nftRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        nftRef,
        { nft: Nftwatchlist.filter((wish) => wish !== nft?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${nft.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchNFT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (!nft) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img src={nft?.image.small} height="200" style={{ marginBottom: 20 }} />
        <Typography variant="h3" className={classes.heading}>
          {nft?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(nft?.description.split(". ")[0])}.
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {/* {ReactHtmlParser(nft?.description.split(". "))}. */}
        </Typography>
                  {/* ---------------------- */}

        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              market_cap
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "irs ",
              }}
            >
              {numberWithCommas(nft?.market_cap.usd)}
            </Typography>
          </span>
          {/* ---------------------- */}

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
            volume_24h
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "irs ",
              }}
            >
              {numberWithCommas(nft?.volume_24h.usd)}
            </Typography>
          </span>
          {/* ---------------------- */}

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              market_cap
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "irs ",
              }}
            >
              {numberWithCommas(nft?.market_cap.usd)}
            </Typography>
          </span>

          {/* ---------------------- */}

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              total_supply{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "irs ",
              }}
            >
              {" "}
              {numberWithCommas(nft?.total_supply)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              floor_price{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "irs ",
              }}
            >
              {" "}
              {numberWithCommas(nft?.floor_price.usd)}
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </div>
      </div>





      {/* <NftInfo nft={nft} /> */}
    </div>
  );
};

export default NFTsPage;
