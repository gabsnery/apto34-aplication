import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  CardMedia,
  Grid,
  useTheme,
  CardActions,
  Modal,
} from "@mui/material";
//import { Link } from 'react-router-dom'

import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import { Product } from "store/api/product/product.interface";
import { Text, TextField } from "ui-layout";
import AddIcon from "@mui/icons-material/Add";
import { addProduct } from "store/slices/cartSlice";
import { useState } from "react";
import { useGetProductQuery } from "store/api/product";
import { useParams } from "react-router-dom";

const ProductView: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetProductQuery(+(id || 0), { skip: id === undefined });
  const [quantity, setQuantity] = useState<number>(0);

  const theme = useTheme();
  const handleAddToCart = () => {
    if (id && data) {
      dispatch(addProduct({ product: data, quantity }));
    }
  };

  return (
    <>
      <Grid item container p={2} columnSpacing={2}>
        <Grid item xs={4}>
          <Grid item xs={12}>
            <img
              style={{
                backgroundImage: `url(${data?.photos[0]})`,
                width: "100%",
                height: "700px",
                backgroundPosition: "top",
                backgroundSize: "cover",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {data?.photos.map((item, idx) => (
              <img key={idx} src={item} style={{ width: `20%` }} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid item xs={12}>
            <Text variant="h2" >
              {data?.nome}
            </Text>
          </Grid>
          <Grid item xs={12}>
            <Text variant="h4" >
              {data?.descricao}
            </Text>
          </Grid>
          <Grid item xs={12}>
            {data?.produtoSubcategoria.map((item, idx) => (
              <Text key={idx} variant="body" >
                {item.subcategoria}
              </Text>
            ))}
          </Grid>
          <Grid item xs={12}>
            {data?.cores.map((item, idx) => (
              <Text key={idx} variant="body" >
                {item.descricao}
              </Text>
            ))}
          </Grid>
          <Grid item xs={12}>
            {data?.tamanhos.map((item, idx) => (
              <Text key={idx} variant="body" >
                {item.descricao}|
              </Text>
            ))}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("quantity")}
              onChange={(ev) => setQuantity(+ev.target.value)}
              value={quantity}
              required
              
            />
            <IconButton
              onClick={handleAddToCart}
              sx={{
                color: "primary.contrastText",
                backgroundColor: "primary.main",
                borderRadius: "2px",
                p: "8px",
              }}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* {JSON.stringify(data)} */}
      </Grid>
    </>
  );
};
export default ProductView;
