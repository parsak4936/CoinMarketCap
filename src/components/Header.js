import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "irs ",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
function Header() {
  const classes = useStyles();
  const { currency, setCurrency, user } = CryptoState();

  const history = useHistory();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push(`/`)}
              variant="h6"
              inlinestyle
              in
              react
              style={{ marginTop: "20px" }}
              className={classes.title}
            >
              Crypto parham
            </Typography>

            <Typography
              onClick={() => history.push(`/`)}
              variant="h6"
              inlinestyle
              in
              react
              style={{ marginTop: "20px" }}
              className={classes.title}
            >
              Coins
            </Typography>

            <Typography
              onClick={() => history.push(`/NFTs`)}
              variant="h6"
              inlinestyle
              in
              react
              style={{ marginTop: "20px" }}
              className={classes.title}
            >
              NFTs
            </Typography>
            <Typography
              onClick={() => history.push(`/Indexes`)}
              variant="h6"
              inlinestyle
              in
              react
              style={{ marginTop: "20px" }}
              className={classes.title}
            >
              Indexes
            </Typography>
            <Typography
              onClick={() => history.push(`/Exchanges`)}
              variant="h6"
              inlinestyle
              in
              react
              style={{ marginTop: "20px" }}
              className={classes.title}
            >
              Exchanges
            </Typography>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ margin: 9, width: 85, height: 40 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>ریال</MenuItem>
            </Select>

            {user ? <UserSidebar /> : <AuthModal />}
            
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
