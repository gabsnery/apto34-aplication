import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { deleteProduct } from "store/slices/cartSlice";
import { RootState } from "store/store";
import { Text } from "ui-layout";
import { useAppDispatch } from "../../store/store";
import { useTheme } from "styled-components";
import { Product } from "store/api/product/product.interface";
import { useGetImageQuery } from "store/api/product";
interface IProps {
  item: Product;
  quantity: number;
  idx: number;
}
const CartListItem: React.FC<React.PropsWithChildren<IProps>> = ({
  item,
  quantity,
  idx,
}) => {
  const { t } = useTranslation(["product", "translation"]);

  const theme = useTheme();
  const cart = useSelector((st: RootState) => st.cart);
  const dispatch = useAppDispatch();
  const [photoId, setPhotoId] = useState<string | undefined>();
  const { data: photoData, isLoading: isPhotoLoading } = useGetImageQuery(
    photoId || "",
    {
      skip: photoId === undefined,
    }
  );
  useEffect(() => {
    if (item) {
      setPhotoId(item.thumbnails[0]);
    }
  }, [item]);
  return (
    <Grid item container key={idx}>
      <Grid item xs={4} sm={2}>
        {photoData && (
          <img
            style={{
              backgroundImage: `url(${photoData.url})`,
              width: "100%",
              height: "150px",
              backgroundPosition: "top",
              backgroundSize: "cover",
            }}
          />
        )}
      </Grid>
      <Grid container item xs={8} sm={10}>
        <Grid item xs={12} sm={6} alignContent={"center"}>
          <Text variant={"h5"}>{t(`product:name_${item.id}`)}</Text>
        </Grid>
        <Grid item xs={12} sm={2} alignContent={"center"}>
          <Text variant={"h5"}>{(+item.valor_produto).toFixed(2)}</Text>
        </Grid>
        <Grid item xs={12} sm={2} alignContent={"center"}>
          <Text variant={"h5"}>{quantity}</Text>
        </Grid>
        <Grid item xs={12} sm={2} alignContent={"center"}>
          <IconButton
            sx={{
              cursor: "pointer",
              justifyContent: "end",
              color: theme.text.primary,
            }}
            onClick={() => {
              dispatch(deleteProduct(item));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartListItem;
