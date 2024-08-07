import { Button, Text } from "ui-layout";
import { Box, Grid, Modal } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

interface IProps {
  confirmModal: boolean;
  category?: string;
  setConfirmModal: (value: boolean) => void;
}
const ConfirmationModal: FC<React.PropsWithChildren<IProps>> = ({
  confirmModal,category,
  setConfirmModal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: theme.colors.background,
    border: "2px solid #000",
    boxShadow: 24,
    paddingTop: "30px",
  };

  return (
    <Modal
      open={confirmModal}
      onClose={() => {
        setConfirmModal(false);
      }}
    >
      <Box sx={style}>
        <Grid container>
          <Grid item xs={12}>
            <Text>{t("are_you_sure")}</Text>
          </Grid>
          <Grid item xs={6} textAlign={"center"}>
            <Button
              variant="secondary"
              onClick={() => {
                if (category) navigate(`/store/${category}`);
                else navigate(`/store`);
              }}
            >
              Continuar comprando
            </Button>
          </Grid>
          <Grid item xs={6} textAlign={"center"}>
            <Button
              onClick={() => {
                navigate(`/cart`);
              }}
            >
              Ir para carrinho
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
