import { Grid } from "@mui/material";
//import { Link } from 'react-router-dom'
import { useGetOrdersQuery } from "store/api/Order";
import { Text } from "ui-layout";
import OrderItem from "./orderListItem";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const OrderList: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { data } = useGetOrdersQuery();
  return (
    <Grid
      container
      direction="row"
      rowSpacing={2}
      columnSpacing={3}
      sx={{
        height: "inherit",
      }}
    >
      <Grid item container>
        <Grid container item xs={8} sm={10}>
          <Grid
            item
            xs={12}
            sm={6}
            alignContent={"center"}
            sx={{ cursor: "pointer" }}
            onClick={() => {}}
          ></Grid>
          <Grid item xs={12} sm={2} alignContent={"center"}>
            <Text variant={"h5"}>n° do pedido</Text>
          </Grid>
          <Grid item xs={12} sm={2} alignContent={"center"}>
            <Text variant={"h5"}>data da compra</Text>
          </Grid>
          <Grid item xs={12} sm={2} alignContent={"center"}>
            <Text variant={"h5"}>status</Text>
          </Grid>
        </Grid>
      </Grid>
      {data?.map((item, index) => {
        return <OrderItem item={item} />;
      })}
    </Grid>
  );
};
export default OrderList;
