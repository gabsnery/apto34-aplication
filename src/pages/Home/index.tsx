import { useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import ProductsGrid from "components/ProductGrid";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import Banner from "components/Banner";
import ProductsCarroussel from "components/ProductsCarroussel";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
import { useEffect } from "react";
const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();

  const banners = [
    {
      image: "https://www.advertserve.com/blog/images/bannerflow.jpg",
      title: "Novas Coleções de Verão",
      subtitle: "Descubra as últimas tendências da estação",
    },
    {
      image: "https://www.advertserve.com/blog/images/bannerflow.jpg",
      title: "Descontos de Inverno",
      subtitle: "Aproveite até 50% de desconto em roupas de inverno",
    },
    {
      image: "https://www.advertserve.com/blog/images/bannerflow.jpg",
      title: "Nova Linha de Acessórios",
      subtitle: "Complete seu look com nossos acessórios",
    },
  ];

  return (
    <>
      <Banner banners={banners} />
      <ProductsCarroussel keyValue={"swipe1"} />
    </>
  );
};
export default Home;
