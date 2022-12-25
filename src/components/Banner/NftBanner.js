import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";
import NftCarousel from "./NftCarousel";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

function NftBanner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "irs ",
            }}
          >
            Crypto parham
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "irs ",
            }}
          >
           تمام اطلاعات رمز ارز های مورد نظرتان را اینجا پیدا کنید!
          </Typography>
        </div>
        <NftCarousel />
      </Container>
    </div>
  );
}

export default NftBanner;
