import { Grid, useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import { mockProducts } from "./mock";
import ProductsCard from "components/ProductCard";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const ProductsGrid: React.FC<React.PropsWithChildren<unknown>> = () => {
    const { t } = useTranslation(["login", "common"]);
    const dispatch = useAppDispatch();

    const theme = useTheme();

    return (
        <Grid
            container
            direction="row"
            rowSpacing={2}
            columnSpacing={3}
            sx={{
                backgroundColor: theme.palette.background.default,
                height: "inherit",
                px: '50px',

            }}
        >
            {mockProducts.map((prod, idx) => (<Grid key={idx} item xs={6} sm={4} md={3} lg={2}  ><ProductsCard value={prod} /></Grid>))}
        </Grid>
    );
};
export default ProductsGrid;
