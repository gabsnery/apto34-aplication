import { Box, Card, CardActionArea, CardContent, IconButton, CardMedia, Grid, useTheme, CardActions, Modal } from "@mui/material";
//import { Link } from 'react-router-dom'

import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import { Product } from "store/api/product/product.interface";
import { Text, TextField } from "ui-layout";
import AddIcon from "@mui/icons-material/Add";
import { addProduct } from "store/slices/cartSlice";
import { useState } from "react";

// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
export const AddModal: React.FC<{
  modal: { open: boolean, item: Product|undefined  },
  setModal: (value: { open: boolean, item: Product|undefined }) => void
}> = ({ modal, setModal }) => {
  const [quantity, setQuantity] = useState<number>(1)
  const dispatch = useAppDispatch();

  return <Modal open={modal.open} onClose={() => {
    setModal({ open: false,item:undefined })
  }}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={{
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4
    }}>
      <Grid container rowSpacing={1}
        justifyContent="flex-end"
        columnSpacing={1} >


        <Grid item xs={6} >
          <TextField
            label={'Quantidade'}
            onChange={(ev) => setQuantity(+ev.target.value)}
            type="number"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6} >
          <IconButton onClick={() => {
           modal.item && dispatch(addProduct({ product: modal.item, quantity: quantity }))
           setModal({ open: false,item:undefined })
          }} sx={{ border: '1px solid red', color: 'white', backgroundColor: 'red', borderRadius: '2px', py: '2px', px: '5px' }}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  </Modal >
}
export const ProductsCard: React.FC<{ value: Product }> = ({ value }) => {
  const { t } = useTranslation(["login", "common"]);
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<{ open: boolean, item: Product | undefined }>({ open: false, item: undefined })

  const theme = useTheme();

  return (
    <>
    <AddModal modal={modal} setModal={setModal}/>
    <Box>
      <Card sx={{borderRadius:'0'}}>
        {/* <CardActionArea> */}
        <CardMedia
          component="img"
          height="250"
          sx={{ objectPosition: 'top' }}
          image={value.picture}
          alt="green iguana"
        />
        <CardContent>
          <Grid container >
            <Grid item xs={12} >
              <Text gutterBottom variant="h5" sx={{
                height: '3.6em',
                lineHeight: '1.8em'
              }}>
                {value.id} {value.name}
              </Text>
            </Grid>
            <Grid item xs={6} sx={{ py: '6px' }}>
              <Text variant="body" color="secondary">
                {`R$${value.value}`}
              </Text>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <IconButton onClick={() => {
                setModal({open:true,item:value})
              }} sx={{ color: 'primary.light', backgroundColor: 'primary.dark', borderRadius: '2px', py: '2px', px: '5px' }}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        {/* </CardActionArea> */}
      </Card>


    </Box>
    </>
  );
};
export default ProductsCard;
