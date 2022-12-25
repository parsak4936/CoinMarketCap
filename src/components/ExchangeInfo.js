import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart, HistoricalExchange } from "../config/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import { useParams } from "react-router-dom";

const ExchangeInfo = ({ Exchangesdata }) => {
    const { id } = useParams();
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(6);
  const { currency } = CryptoState();
console.log(historicData)


  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "irs !important",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        fontFamily: "irs ",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalExchange(id, days));

    setHistoricData(data);
  };

  useEffect(() => {
    fetchHistoricData();
    
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {/* <div className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((Exchangesdata) => {
                  let date = new Date(Exchangesdata[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((Exchangesdata) => Exchangesdata[1]),
                    label: `قیمت در طول ${days} روز گذشته به واحد ${currency}`,
                    
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div> */}
    </ThemeProvider>
  );
};

export default ExchangeInfo;
