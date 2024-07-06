//import { Link } from 'react-router-dom'

import Banner from "components/Banner";
import ProductsCarroussel from "components/ProductsCarroussel";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import MiniBanner from "components/MiniBanner";
import { Grid } from "@mui/material";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  const banners = [
    {
      image: "https://www.advertserve.com/blog/images/bannerflow.jpg",
      title: "Novas Coleções de Verão",
      subtitle: "Descubra as últimas tendências da estação",
    },
    {
      image:
        "https://www.niit.com/india/sites/default/files/2022-04/HTML_1920x565px.jpg",
      title: "Descontos de Inverno",
      subtitle: "Aproveite até 50% de desconto em roupas de inverno",
    },
    {
      image:
        "https://miro.medium.com/v2/resize:fit:1024/0*L5Hv8vQD_MqEwhRL.png",
      title: "Nova Linha de Acessórios",
      subtitle: "Complete seu look com nossos acessórios",
    },
  ];

  return (
    <>
      <Grid
        container
        justifyContent={"center"}
      >
        <Banner banners={banners} />
        <Grid item xs={9}>
          <ProductsCarroussel keyValue={"swipe1"} />
        </Grid>
        <Grid container justifyContent={"center"} columnSpacing={2}>
          <Grid item xs={3} sx={{ height: "350px" }}>
            <div
              className="banner-image"
              style={{
                backgroundImage: `url(https://storage.googleapis.com/apto34/assets/markus-spiske-5UJbKYUjFCk-unsplash.jpg)`,
              }}
            >
              <div className="banner-text">
                <h2>{"banner.title"}</h2>
                <p>{"banner.subtitle"}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={3} sx={{ height: "350px" }}>
            <div
              className="banner-image"
              style={{
                backgroundImage: `url(https://storage.googleapis.com/apto34/assets/artem-beliaikin-49mCO5ZRQDk-unsplash.jpg)`,
              }}
            >
              <div className="banner-text">
                <h2>{"banner.title"}</h2>
                <p>{"banner.subtitle"}</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={3} sx={{ height: "350px" }}>
            <div
              className="banner-image"
              style={{
                backgroundImage: `url(https://storage.googleapis.com/apto34/assets/andrew-knechel-gG6yehL64fo-unsplash.jpg)`,
              }}
            >
              <div className="banner-text">
                <h2>{"banner.title"}</h2>
                <p>{"banner.subtitle"}</p>
              </div>
            </div>
          </Grid>
        </Grid>
        <MiniBanner
          banner={{
            image:
              "https://miro.medium.com/v2/resize:fit:1024/0*L5Hv8vQD_MqEwhRL.png",
            title: "Nova Linha de Acessórios",
            subtitle: "Complete seu look com nossos acessórios",
          }}
        />
        <Grid item xs={9}>
          <ProductsCarroussel keyValue={"swipe3"} />
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
