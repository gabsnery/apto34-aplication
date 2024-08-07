import { Button, Text } from "ui-layout";
import { Box, Modal, useTheme } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { clearConfirmationModal } from "../store/slices/confirmationModalSlice";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

const ConfirmationModalHandler = () => {
  const modal = useSelector((st: RootState) => st.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (modal.open !== open) setOpen(modal.open);
  }, [modal]);
  useEffect(() => {
    if (open === false) dispatch(clearConfirmationModal());
  }, [open]);
  return (
    <Modal
      open={modal.open}
      onClose={() => {
        setOpen(false);
      }}
      title={modal.title}
    >
      <Box sx={style}>
        {`${t(modal.message)}`}
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          {modal.yesText}
        </Button>
        <Button
          onClick={() => {
            modal.onConfirm && modal.onConfirm();
          }}
        >
          {modal.noText}
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfirmationModalHandler;
