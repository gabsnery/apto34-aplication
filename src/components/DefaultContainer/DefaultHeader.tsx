import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  Toolbar, useTheme
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

import logo from "assets/img/logo-sl-horizontal.svg";
import React, { FC } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
//import minerva from 'assets/img/minerva-logo-white.png'
import items, { NavObj } from './nav';
import { Button, Text } from "ui-layout";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/store";
import { logout } from "store/slices/logout";

const DefaultHeader: FC<React.PropsWithChildren<{}>> = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const cart = useSelector((st: RootState) => st.cart)
  const dispatch = useAppDispatch();

  return (
    <>
      <AppBar
        elevation={0}
        position="sticky"
        sx={{
          height: 100,
          backdropFilter: "blur(6px)",
          backgroundColor: theme.palette.background.default,
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <RouterLink to="/">
            <img src={logo} alt="logo" style={{ height: 100, marginTop: 10 }} />
          </RouterLink>
<Button variant="text" color="primary" onClick={()=>{
    dispatch(logout())

}}>Sair</Button>
          <Grid container rowSpacing={2} direction="row"
            sx={{
              display: 'flex',
              marginLeft: 'auto',
              justifyContent: 'end',
            }}
          >


            {items.map((item: NavObj, idx: number) => {
              return <Grid display={{ xs: "none", sm: 'block' }} item key={idx}>
                <Button key={idx} sx={{ padding: '13px' }} variant="text" color={"primary"} onClick={() => {
                  navigate(item.link)
                }}>
                  <Text variant={"h5"} weight={500} color="grey.700">
                    {item.name}
                  </Text>
                </Button>
              </Grid>
            })}
            <Grid item>
              <Badge badgeContent={cart.items.length} color="primary">
                <IconButton onClick={(e) => {
                  navigate('/cart')
                }} edge="end" size="large" color="primary" >
                  <ShoppingCartIcon height={25} width={25} fontSize="inherit" color="action" />
                </IconButton>
              </Badge>
            </Grid>
            <Grid item>
           <Text sx={{ padding: '13px' }}  variant={"h5"} weight={900} color="grey.700"> {`Olá, ${'Fulana'}`}</Text>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
};
export default DefaultHeader;
