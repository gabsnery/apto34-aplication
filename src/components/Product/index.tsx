import { Grid, Skeleton } from "@mui/material";
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

const ProductView: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(["product", "translation"], {
    useSuspense: true,
  });
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductQuery(+(id || 0), {
    skip: id === undefined,
  });
  const [photoId, setPhotoId] = useState<string | undefined>();
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const { data: photoData, isLoading: isPhotoLoading } = useGetImageQuery(
    photoId || "",
    {
      skip: photoId === undefined,
      pollingInterval: signed_files_expiration,
    }
  );
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    if (id && data && quantity>0) {
      dispatch(addProduct({ product: data, quantity }));
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
            <Grid item xs={12}>
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
            </Grid>

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
                  if (quantity > 0 && data) {
                    dispatch(addProduct({ product: data, quantity }));
                    navigate('/cart')
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
