import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  CardMedia,
  Grid,
  Modal,
} from "@mui/material";
//import { Link } from 'react-router-dom'

import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import { Product } from "store/api/product/product.interface";
import AddIcon from "@mui/icons-material/Add";
import { addProduct } from "store/slices/cartSlice";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text,TextField } from "ui-layout";
import { useTheme } from "styled-components";

// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'

export const AddModal: React.FC<{
  modal: { open: boolean; item: Product | undefined };
  setModal: (value: { open: boolean; item: Product | undefined }) => void;
}> = ({ modal, setModal }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { t } = useTranslation(["product", "translation"]);

  const handleAddToCart = () => {
    if (modal.item) {
      dispatch(addProduct({ product: modal.item, quantity }));
      setModal({ open: false, item: undefined });
    }
  };

  return (
    <Modal
      open={modal.open}
      onClose={() => setModal({ open: false, item: undefined })}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: theme.paper.default,
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              label={t('quantity')}
              value={quantity}
              onChange={(ev) => setQuantity(+ev.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
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
      </Box>
    </Modal>
  );
};

export const ProductsCard: React.FC<{ value: Product; dragging?: boolean }> = ({
  value,
  dragging,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["product", "translation"]);
  const theme = useTheme();
  const [modal, setModal] = useState<{
    open: boolean;
    item: Product | undefined;
  }>({ open: false, item: undefined });
  const navigate = useNavigate();
  const handleOnItemClick = useCallback(
    (e: any) => {
      if (dragging) e.stopPropagation();
    },
    [dragging]
  );

  return (
    <>
      <AddModal modal={modal} setModal={setModal} />
      <Box onClickCapture={handleOnItemClick}>
        <Card sx={{ boxShadow: 4, backgroundColor: theme.paper.default }}>
          <CardActionArea
            component="a"
            onClick={(e) => {
              handleOnItemClick(e);
              navigate(`/product/${value.id}`);
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={
                value.thumbnails.length > 0
                  ? value.thumbnails[0]
                  : "https://www.futuraexpress.com.br/blog/wp-content/uploads/2020/03/JPG-Alta-Qualidade.jpg"
              }
              alt={value.nome}
            />
            <CardContent>
              <div style={{ height: "50px" }}>
                <Text color="primary" variant="h5">
                  {t(`name_${value.id}`)}
                </Text>
              </div>
              <Grid
                container
                alignItems="center"
                mt={3}
                justifyContent="space-between"
              >
                <Grid item xs={6}>
                  <Text variant="body" color="secondary">
                    {`R$ ${(+value.valor_produto).toFixed(2)}`}
                  </Text>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      setModal({ open: true, item: value });
                    }}
                    onMouseDown={(event) => event.stopPropagation()}
                    sx={{
                      color: "white",
                      borderRadius: "2px",
                      py: "2px",
                      px: "5px",
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );
};

export default ProductsCard;
