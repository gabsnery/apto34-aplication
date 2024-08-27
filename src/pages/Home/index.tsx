import { Grid } from "@mui/material";
import CategorySelector from "components/CategorySelector";
import MiniBanner from "components/MiniBanner";
import ProductsSlider from "components/ProductsSlider";
import { useTranslation } from "react-i18next";
import { useGetBannersQuery } from "store/api/Banner";
import { useTheme } from "styled-components";
import { Text,Button } from 'ui-layout';
import BannerCarousel from "components/BannerCarousel";
import SimpleBanner from "components/SimpleBanner";
import { useAppDispatch } from "store";
import { useNavigate } from "react-router-dom";
import { setFilter } from "store/slices/sessionFilterSlice";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data: banners, isLoading: isBannerLoading } = useGetBannersQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Grid container justifyContent={"center"} rowGap={3}>
      <Grid item container xs={12} columnSpacing={2}>
        <CategorySelector />
      </Grid>
        <Grid item width={'98vw'}>
          {isBannerLoading ? (
            <></>
          ) : (
            <BannerCarousel
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
        <Grid item xs={12} sm={12}>
          <ProductsSlider />
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          sx={{p:3}}
          columnSpacing={3}
          rowSpacing={1}
        >
          <Grid item xs={12} sm={6} md={4} sx={{ height: "350px" }}>
          <SimpleBanner image={"priscilla-du-preez-dlxLGIy-2VU-unsplash.jpg"} title={"BAnner 1"} subtitle={"Conheça nossa equipe"} url={""}/>
          
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ height: "350px" }}>
          <SimpleBanner color={"#D4A59F"} title={"Calçados"} subtitle={"Veja nossos calçados"} url={""} onClick={()=>{
             dispatch(
              setFilter({
                filter: "type",
                value: 2,
                discount:70
              })
            );
            navigate('/store')
          }}/>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ height: "350px" }}>
          <SimpleBanner image={"priscilla-du-preez-dlxLGIy-2VU-unsplash.jpg"} title={"BAnner 3"} subtitle={""} url={""}/>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <MiniBanner
            banner={{
              image:
                "",
              title: "Nova Linha de Acessórios",
              subtitle: "Complete seu look com nossos acessórios",
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <ProductsSlider />
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
