import { Drawer, Grid,  IconButton, Tooltip } from "@mui/material";
import useResponsive from "hooks/useResponsive";
import { useState, useEffect } from "react";
import { useGetOrderQuery } from "store/api/Order"; // Assuming useGetOrdersQuery is not needed
import { useTheme } from "styled-components";
import { Button, Text } from 'ui-layout';

interface IProps {
  item: any;
}

const OrderItem: React.FC<IProps> = ({ item }) => {
  const { data, isLoading, error } = useGetOrderQuery(item.id);
  const theme = useTheme();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const {isSm,isMd,isXs} =useResponsive()

  // Handle loading and error states gracefully
  if (isLoading) return <Text variant="body">Carregando detalhes do pedido...</Text>;
  if (error) return <Text variant="body" color="error">Erro ao carregar detalhes do pedido.</Text>;

  const order = data; // Assuming data is the order object

  const handleOpenDetails = () => {
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  return (
    <Grid item container sx={{ borderBottom: `1px solid ${theme.text.primary}` }}>
      <Grid container item xs={8} sm={10}>
        <Grid item xs={12} sm={6}>
          <Text variant="h6">{order?.cliente?.nome}</Text>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Text variant="body">{order?.id}</Text>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Text variant="body">{order?.payment?.status}</Text>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Tooltip title="Ver detalhes do pedido">
            <Button onClick={handleOpenDetails} variant={"tertiary"} aria-label="Ver detalhes">
              Ver detalhes
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      <Drawer
        anchor="right"
        open={detailsOpen}
        onClose={handleCloseDetails}
        sx={{
          zIndex: 1250,
        }}
        PaperProps={{
          sx: {
            width: isXs?'80%':isSm?'60%':isMd?'30%':'25%',
            paddingTop: theme.spacing.medium,
            paddingLeft: theme.spacing.medium,
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Text variant="h3">Detalhes do Pedido #{order?.id}</Text>
         <Text> {data?.nome}</Text>
       {data?.products?.map((item:any)=><Text>{item.nome} {item.pedido_tem_produto.quantidade}</Text>)}
      </Drawer>
    </Grid>
  );
};

export default OrderItem;