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
  import CoinInfo from "../components/CoinInfo";
  import { SingleCoin, SingleIndex } from "../config/api";
  import { numberWithCommas } from "../components/CoinsTable";
  import { CryptoState } from "../CryptoContext";
  import { doc, setDoc } from "firebase/firestore";
  import { db } from "../firebase";
  
  const IndexPage = () => {
    const {market_id, id } = useParams();
    const [indexes, setindexes] = useState();
  
    const { currency, symbol, user, setAlert, Coinwatchlist } = CryptoState();
  
    const fetchIndex = async () => {
      const { data } = await axios.get(SingleIndex(id));
  
      setindexes(data);
    };
  
    
    useEffect(() => {
        fetchIndex();
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
  
    if (!indexes) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  
    return (
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img
            src={indexes?.image.large}
            alt={indexes?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className={classes.heading}>
            {indexes?.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.description}>
            {ReactHtmlParser(indexes?.description.en.split(". ")[0])}.
          </Typography>
          <div className={classes.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                رتبه
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "irs ",
                }}
              >
                {numberWithCommas(indexes?.market_cap_rank)}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
               قیمت در حال حاضر :
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "irs ",
                }}
              >
                {symbol}{" "}
                {/* {numberWithCommas(
                  indexes?.market_data.current_price[currency.toLowerCase()]
                )} */}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
             ارزش بازار
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "irs ",
                }}
              >
                {symbol}{" "}
                {/* {numberWithCommas(
                  indexes?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )} */}
                M
              </Typography>
            </span>
 
          </div>
        </div>
     
      </div>
    );
  };
  
  export default IndexPage;
  