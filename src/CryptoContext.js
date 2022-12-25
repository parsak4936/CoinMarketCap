import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import axios from "axios";
import { CoinList, ExchangeLists, IndexLists, NFTsList } from "./config/api";
import { onSnapshot, doc } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState([]);

  const [nfts, setnfts] = useState([]);
  const [Indexes, setIndexes] = useState([]);
  const [Exchanges, setExchanges] = useState([]);

  const [loading, setLoading] = useState(false);
  const [Coinwatchlist, setCoinWatchlist] = useState([]);
  const [Nftwatchlist, setNftWatchlist] = useState([]);
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setCoinWatchlist(coin.data().coins);
          setNftWatchlist(coin.data().nft);
        }
        //  else if(nft.exists()){
        //   console.log(nft)
        //  }
        else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  const fetchNfts = async () => {
    setLoading(true);
    const { data } = await axios.get(NFTsList());
    setnfts(data);
    setLoading(false);
  };
  const fetchIndex = async () => {
    setLoading(true);
    const { data } = await axios.get(IndexLists());
    setIndexes(data);
    setLoading(false);
  };
  const fetchExchange = async () => {
    setLoading(true);
    const { data } = await axios.get(ExchangeLists());
    setExchanges(data);
    setLoading(false);
  };
  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "INR") setSymbol("IRR");
    fetchNfts();
    fetchCoins();
    fetchIndex();
    fetchExchange();
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        alert,
        setAlert,
        user,
        nfts,
        Indexes,
        coins,
        loading,
        Exchanges,
        Coinwatchlist,
        Nftwatchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
