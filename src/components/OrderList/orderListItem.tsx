import { Grid } from "@mui/material";
//import { Link } from 'react-router-dom'
import { useGetOrderQuery, useGetOrdersQuery } from "store/api/Order";
import { Text } from 'ui-layout';
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
interface IProps{
  item: any;
}
const OrderItem: React.FC<IProps> = ({item}) => {
  const {data}=useGetOrderQuery(item.id)
  return (
    <Grid item container>
    <Grid container item xs={8} sm={10}>
      <Grid
        item
        xs={12}
        sm={6}
        alignContent={"center"}
        sx={{ cursor: "pointer" }}
        onClick={() => {
        }}
      >
        <Text variant={"h5"}>'sssssssssssssssssss'</Text>
      </Grid>
      <Grid item xs={12} sm={2} alignContent={"center"}>
        <Text variant={"h5"}>{item.id}</Text>
      </Grid>
      <Grid item xs={12} sm={2} alignContent={"center"}>
      <Text variant={"h5"}>{item.id}</Text>
      </Grid>
      <Grid item xs={12} sm={2} alignContent={"center"}>
      <Text variant={"h5"}>{item.payment?.status}</Text>
       
      </Grid>
    </Grid>
  </Grid>
  );
};
export default OrderItem;
