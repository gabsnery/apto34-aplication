import ProductsCard from "components/ProductCard";
import { useState } from "react";
import { Button, theme } from "ui-layout";
import { mockProducts } from "../ProductGrid/mock";
import "./style.css";
import { Grid } from "@mui/material";


export const ProductsCarroussel: React.FC = () => {
  const [firstItemToShowIndex, setfirstItemToShowIndex] = useState<number>(0);
  const quantityToShow = 5
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
    >  <Grid item xs={1} sx={{ alignSelf: 'center' }}>
      <Button disabled={(firstItemToShowIndex - quantityToShow < 0 && firstItemToShowIndex === 0)} variant='contained' color="primary" onClick={() => {
      setfirstItemToShowIndex(firstItemToShowIndex - quantityToShow < 0 ? 0 : firstItemToShowIndex - quantityToShow)
    }}> {'<'}</Button></Grid>
      <Grid item xs={10}> <div className="carousel-container" style={{ maxWidth: 1500, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
        <div className="carousel-wrapper">
          <div className="carousel-content-wrapper">
            <div className="carousel-content" style={{ transform: `translateX(-${(firstItemToShowIndex * ((100) / quantityToShow))}%)` }}>
              {mockProducts.map((prod, idx) =>
                (<div style={{ width: `calc(${(100) / quantityToShow}% - 20px)`, margin: '0 10px' }} key={idx}><ProductsCard value={prod} /></div>))}
            </div>
          </div>
        </div>
      </div>
      </Grid>
      <Grid item xs={1} sx={{ alignSelf: 'center' }} textAlign={"right"}>
        <Button variant='contained' disabled={mockProducts.length <= quantityToShow + firstItemToShowIndex} color="primary" onClick={() => {
          const resto = mockProducts.length - (quantityToShow + firstItemToShowIndex)
          resto >= quantityToShow ? setfirstItemToShowIndex(quantityToShow + firstItemToShowIndex) : setfirstItemToShowIndex(firstItemToShowIndex + resto)
        }}> {'>'}</Button>
      </Grid>

    </Grid>
  );
};
export default ProductsCarroussel;
