import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Box from '@mui/material/Box';
 import PropTypes from "prop-types";

import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import TableSortLabel from '@mui/material/TableSortLabel';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ExchangeTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const {symbol, Exchanges, loading } = CryptoState();
  const [selected, setSelected] = React.useState([]);
 
 

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    console.log("thi is order changes in handle request sort :    "+ order)
   };
//Table Headers are : 
const headCells = [
  {
    id: 'id',
    label: 'بازار تبادل ',
  },
  {
    id: 'current_price',

    label: 'ID',
  },
  {
    id: 'price_change_percentage_24h',
    label: ' کشور  ',
  },
  {
    id: 'market_cap',

    label: ' کد اعتبار  ',
  },

];
   function EnhancedTableHead(props) {
    
    const { order, orderBy, onRequestSort } =
    props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
     
      <TableHead  style={{ backgroundColor: "#EEBC1D" }}>
      <TableRow style={{direction:"rtl" }}>
       
        {headCells.map((headCell) => (
          <TableCell
          style={{ color: "black",
              fontWeight: "700",
              direction:'rtl',
              textAlign:'right',
              fontFamily: "irs  ",}}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    );
  }
  EnhancedTableHead.propTypes = {
   
    onRequestSort: PropTypes.func.isRequired,
  
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
  
  };
 
 
  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "irs !important",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        fontFamily: "irs !important",
        direction:"rtl ",
        color: "gold",
      },
    },
  });

  const classes = useStyles();
  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return Exchanges.filter(
      (Exchanges) =>
      
      Exchanges.name.toLowerCase().includes(search)  
      
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{      fontFamily: "irs",
 textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18,       fontFamily: "irs ",
        }}
        >
         کریپتو کورنسی توسط پرهام صفری
        </Typography>
        
        <TextField
          label="نام رمز ارز مورد نظر را سرچ کنید"
          variant="outlined"
          style={{fontFamily: "irs", marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer style={{  direction:"rtl" }} component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">



{/* -----------------Table Head-------------------------- */}


        <EnhancedTableHead
               
               order={order}
               orderBy={orderBy}
               onRequestSort={handleRequestSort}
               rowCount={10}

            
 
            />


{/* -------------------Table Body---------------------------- */}
              <TableBody>
                {
                handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    
                    return (
                      <TableRow
                        onClick={() => history.push(`/Exchanges/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            fontfamily:"irs",
                           
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                
                              }}
                            >
                              {row.name}
                            </span>

                            <span style={{ color: "darkgrey" }}>
                            
                             {row.year_established}
                            
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                        <span style={{ color: "darkgrey" }}>
                            
                            {row.id}
                           
                           </span>
                         </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            // color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                           {row.country}
                        </TableCell>
                        <TableCell align="right" style={{fontFamily:'irl !important'}}>
                        {row.trust_score} 
                        
                        </TableCell>
                      </TableRow>
                    );
                    
                  })} ,
                   
              </TableBody>




            </Table>
          )}
        </TableContainer>

         <Pagination
          count={parseInt((handleSearch()?.length / 10).toFixed(0))}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            direction:'rtl ',
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}



