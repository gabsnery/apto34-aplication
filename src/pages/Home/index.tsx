//import { Link } from 'react-router-dom'

import Banner from "components/Banner";
import ProductsCarroussel from "components/ProductsCarroussel";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import MiniBanner from "components/MiniBanner";
import { Grid } from "@mui/material";
import ProductsSlider from "components/ProductsSlider";
import { useGetBannersQuery } from "store/api/Banner";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  const {data:banners}=useGetBannersQuery()
  return (
    <>
      <Grid container justifyContent={"center"} rowGap={2}>
        <Grid item xs={12}>
          <Banner banners={banners?.map(i=>({ image: i.url_image, title: i.title, subtitle: i.description }))||[]} />
        </Grid>

        <Grid item xs={12} sm={9}>
        <ProductsSlider/>
        </Grid>
        <Grid container xs={12} justifyContent={"center"} columnSpacing={3} rowSpacing={1}>
          <Grid item xs={12} sm={6} md={3} sx={{ height: "350px" }}>
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
          <Grid item xs={12} sm={6} md={3} sx={{ height: "350px" }}>
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
          <Grid item xs={12} sm={6} md={3} sx={{ height: "350px" }}>
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
        <Grid item xs={10}>
          <MiniBanner
            banner={{
              image:
                "https://miro.medium.com/v2/resize:fit:1024/0*L5Hv8vQD_MqEwhRL.png",
              title: "Nova Linha de Acessórios",
              subtitle: "Complete seu look com nossos acessórios",
            }}
          />
        </Grid>

        <Grid item xs={9}>
        <ProductsSlider/>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
