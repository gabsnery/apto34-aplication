import { Avatar, Grid, Skeleton, Stack } from "@mui/material";
//import { Link } from 'react-router-dom'

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useGetImageQuery, useGetProductQuery } from "store/api/product";
import { addProduct } from "store/slices/cartSlice";
import { Button, Text } from "ui-layout";
import { NumberField } from "ui-layout";
import { useAppDispatch } from "../../store/store";
import SignedThumbnail from "./signedThumbnail";
import { setConfirmationModal } from "store/slices/confirmationModalSlice";
import ConfirmationModal from "./ConfirmationModal";
import { signed_files_expiration } from "utils";
import { useGetSizesQuery } from "store/api/size";
import { useGetColorsQuery } from "store/api/color";

const ProductView: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["product", "translation"], {
    useSuspense: true,
  });
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: colors } = useGetColorsQuery();
  const { data: sizes } = useGetSizesQuery();

  const { data, isLoading } = useGetProductQuery(+(id || 0), {
    skip: id === undefined,
  });
  const [photoId, setPhotoId] = useState<string | undefined>();
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<number | undefined>();
  const [selectedColor, setSelectedColor] = useState<number | undefined>();
  const { data: photoData, isLoading: isPhotoLoading } = useGetImageQuery(
    photoId || "",
    {
      skip: photoId === undefined,
      pollingInterval: signed_files_expiration,
    }
  );
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    if (id && data && quantity > 0 && selectedColor && selectedSize) {
      dispatch(addProduct({
        product: data,
        idColor: selectedColor,
        idSize: selectedSize,
        quantity,
      }));
      setConfirmModal(true);
    }
  };
  useEffect(() => {
    if (data) {
      setPhotoId(data.photos[0]);
    }
  }, [data]);

  return (
    <>
      <ConfirmationModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        category={data?.produtoSubcategoria[0]?.categoria?.categoria}
      />
      <Grid item container columnSpacing={2}>
        <Grid item xs={12} sm={4}>
          <Grid item xs={12}>
            {isPhotoLoading ? (
              <Skeleton variant="rectangular" width="100%" height="500px" />
            ) : (
              <img
                style={{
                  backgroundImage: `url(${photoData?.url || ""})`,
                  width: "100%",
                  height: "500px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            {data?.thumbnails.map((item, idx) => (
              <SignedThumbnail
                imageId={item}
                onClick={() => {
                  setPhotoId(item);
                }}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={8}>
          <div style={{ width: "100%" }}>
            <Grid container item xs={12} textAlign={"left"}>
              <Grid
                item
                container
                xs={12}
                display={"flex"}
                direction={"row"}
                rowSpacing={2}
              >
                <Grid item xs={12}>
                  <Text variant="h2">
                    {isLoading ? (
                      <Skeleton width="50%" />
                    ) : (
                      data && t(`product:name_${data?.id}`)
                    )}
                  </Text>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Text variant="h4">
                    {isLoading ? (
                      <Skeleton width="60%" />
                    ) : (
                      data && t(`product:description_${data?.id}`)
                    )}
                  </Text>
                </Grid>
                <Grid item xs={12}>
                  {isLoading ? (
                    <Skeleton width="30%" />
                  ) : (
                    data?.produtoSubcategoria.map((item, idx) => (
                      <Text key={idx} variant="body">
                        {item.subcategoria}
                      </Text>
                    ))
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mb={1}>
            {JSON.stringify(data?.stock)}
              <Stack direction="row" spacing={1}>
                {sizes?.map((item, idx) => {
                  const isAvailable =
                    (
                      data?.stock?.filter(
                        (stock) =>
                          stock.sizeId === item.id && stock.quantity > 0
                      ) || []
                    ).length > 0;
                  const iSelected = item.id === selectedSize;

                  return (
                    <Avatar
                      sx={{
                        color: "black",
                        backgroundColor: iSelected
                          ? "pink"
                          : isAvailable
                          ? "transparent"
                          : "lightgrey",
                        border: "1px black solid",
                        fontSize: "10px",
                        cursor: isAvailable ? "pointer" : "unset",
                        ":hover": {
                          backgroundColor: isAvailable
                            ? "lightslategray"
                            : "lightgrey",
                        },
                      }}
                      alt="Remy Sharp"
                      onClick={() => {
                        setSelectedSize(item.id);
                        setSelectedColor(undefined);
                      }}
                    >
                      {item.id}-{item.descricao}
                    </Avatar>
                  );
                })}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                {colors?.map((item, idx) => {
                  const isAvailable =
                    (
                      data?.stock
                        ?.filter(
                          (stock) =>
                            selectedSize === undefined ||
                            stock.sizeId === selectedSize
                        )
                        .filter(
                          (stock) =>
                            stock.colorId === item.id && stock.quantity > 0
                        ) || []
                    ).length > 0;

                    const quantity = data?.stock
                    ?.filter(
                      (stock) =>
                        selectedSize === undefined ||
                        stock.sizeId === selectedSize
                    )
                    .filter(
                      (stock) =>
                        stock.colorId === item.id && stock.quantity > 0
                    ) || []
                  const iSelected = item.id === selectedColor;
                  return (<>
                    <Avatar
                      sx={{
                        color: "black",
                        backgroundColor: iSelected
                          ? "pink"
                          : isAvailable
                          ? "transparent"
                          : "lightgrey",
                        border: "1px black solid",
                        fontSize: "10px",
                        cursor: isAvailable ? "pointer" : "unset",
                        ":hover": {
                          backgroundColor: isAvailable
                            ? "lightslategray"
                            : "lightgrey",
                        },
                      }}
                      onClick={() => {
                        setSelectedColor(item.id);
                      }}
                      alt="Remy Sharp"
                    >
                      {item.descricao} {item.id} 
                    </Avatar>
                    {JSON.stringify(quantity)}
                    </>
                  );
                })}
              </Stack>
            </Grid>
            {data && (
              <Grid
                item
                xs={6}
                textAlign={"left"}
                container
                direction={"column"}
              >
                {data?.discount > 0 && (
                  <Text
                    variant="h3"
                    color="error"
                    style={{ textDecoration: "line-through" }}
                  >
                    {`R$ ${(+data?.valor_produto).toFixed(2)}`}
                  </Text>
                )}
                <Text variant="h3" color="secondary">
                  {`R$ ${(
                    +data?.valor_produto *
                    ((100 - data?.discount) / 100)
                  ).toFixed(2)}`}
                </Text>
              </Grid>
            )}
            {/*  <Grid item xs={12}>
              {isLoading ? (
                <Skeleton width="30%" />
              ) : (
                data?.cores.map((item, idx) => (
                  <Text key={idx} variant="body">
                    {item.descricao}
                  </Text>
                ))
              )}
            </Grid>
            <Grid item xs={12}>
              {data?.tamanhos.map((item, idx) => (
                <Text key={idx} variant="body">
                  {item.descricao}
                </Text>
              ))}
            </Grid> */}

            <Grid item container xs={3} mt={5} rowGap={1} direction={"column"}>
              <NumberField
                label={t("translation:quantity")}
                showIcons={true}
                onNumberChange={(value) => setQuantity(value)}
                value={quantity}
                required
              />

              <Button onClick={handleAddToCart} variant="action2">
                {t("translation:addToCart")}
              </Button>
              <Button
                onClick={() => {
                  if (quantity > 0 && data && selectedColor && selectedSize) {
                    dispatch(
                      addProduct({
                        product: data,
                        idColor: selectedColor,
                        idSize: selectedSize,
                        quantity,
                      })
                    );
                    navigate("/cart");
                  }
                }}
                variant="action"
              >
                {t("translation:buyNow")}
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
