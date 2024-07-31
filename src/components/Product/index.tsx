import { Grid, IconButton, useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "store/api/product";
import { addProduct } from "store/slices/cartSlice";
import { Button, Text, TextField } from "ui-layout";
import { useAppDispatch } from "../../store/store";

const ProductView: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetProductQuery(+(id || 0), { skip: id === undefined });
  const [quantity, setQuantity] = useState<number>(0);

  const theme = useTheme();
  const handleAddToCart = () => {
    if (id && data) {
      dispatch(addProduct({ product: data, quantity }))
    }
  };

  return (
    <>
      <Grid item container columnSpacing={2}>
        <Grid item xs={3}>
          <Grid item xs={12}>
            <img
              style={{
                backgroundImage: `url(${data?.thumbnails[0]})`,
                width: "100%",
                height: "400px",
                backgroundPosition: "top",
                backgroundSize: "cover",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {data?.thumbnails.map((item, idx) => (
              <img key={idx} src={item} style={{ width: `20%` }} />
            ))}
          </Grid>
        </Grid>
        <Grid item container xs={8} >
          <div style={{ width: "100%" }}>
            <Grid container item xs={12} textAlign={"left"}>
              <Grid
                item
                xs={12}
                display={"flex"}
                direction={"column"}
                rowSpacing={2}
              >
                <Grid item xs={12}>
                  <Text variant="h2">{data?.nome}</Text>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Text variant="h4">{data?.descricao}</Text>
                </Grid>
                <Grid item xs={12}>
                  {data?.produtoSubcategoria.map((item, idx) => (
                    <Text key={idx} variant="body">
                      {item.subcategoria}
                    </Text>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            {data?.cores.map((item, idx) => (
              <Text key={idx} variant="body">
                {item.descricao}
              </Text>
            ))}
            {data?.tamanhos.map((item, idx) => (
              <Text key={idx} variant="body">
                {item.descricao}|
              </Text>
            ))}
            <Grid item container xs={3} mt={5} rowGap={1}>
              <TextField
                label={t("quantity")}
                size={"small"}
                onChange={(ev) => setQuantity(+ev.target.value)}
                value={quantity}
                required
              />

              <Button onClick={handleAddToCart} variant="secondary">
                Adicionar à sacola
              </Button>
              <Button onClick={handleAddToCart} >
                Comprar agora
              </Button>
            </Grid>
          </div>
        </Grid>

        {/* {JSON.stringify(data)} */}
      </Grid>
    </>
  );
};
export default ProductView;
