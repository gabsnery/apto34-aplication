import { Grid } from "@mui/material";
import Banner from "components/Banner";
import MiniBanner from "components/MiniBanner";
import ProductsSlider from "components/ProductsSlider";
import { useTranslation } from "react-i18next";
import { useGetBannersQuery } from "store/api/Banner";
import { useTheme } from "styled-components";
import { Text,Button } from 'ui-layout';
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data: banners, isLoading: isBannerLoading } = useGetBannersQuery();
  return (
    <>
      <Grid container justifyContent={"center"} rowGap={3}>
        <Grid item xs={12}>
          {isBannerLoading ? (
            <></>
          ) : (
            <Banner
              banners={
                banners?.map((i) => ({
                  image: i.url_image,
                  title: i.title,
                  subtitle: i.description,
                  url:'/aboutUs'
                })) || []
              }
            />
          )}
        </Grid>
        <Grid item xs={12}  sx={{ height: "100px", backgroundColor:theme.colors.primaryLight, p:3}}>
              <Button variant="tertiary">{t('footer.aboutUsLabel')}</Button>
          </Grid>
        <Grid item xs={12} sm={9}>
          <ProductsSlider />
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          columnSpacing={3}
          rowSpacing={1}
        >
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
          <ProductsSlider />
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
