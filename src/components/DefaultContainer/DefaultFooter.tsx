import {
  AppBar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
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
import { RootState } from "store/store";
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
const DefaultFooter: FC<React.PropsWithChildren<{}>> = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <>
      <BottomNavigation
        showLabels
        sx={{ backgroundColor: theme.palette.primary.main, height: '300px', marginTop: '30px', paddingTop: '30px' }}
        onChange={(event, newValue) => {
          console.log("🚀 ~ file: DefaultFooter.tsx:32 ~ newValue:", newValue)
        }}
      >
        <Grid container rowSpacing={2} direction="row"
          sx={{
            display: 'flex',
            mx: '100px',
          }}
        >
          <Grid item xs={4} textAlign={"center"}>
            <img src={logo} alt="logo" style={{ height: 300 }} />
          </Grid>
          <Grid item xs={4}>
            <Text variant={"h3"} weight={500} color="primary.light">
              {'Contato'}
            </Text>
            <Text variant={"h6"} weight={500} color="primary.light">
              (19) 98262-8074
            </Text>
            <Text variant={"h6"} weight={500} color="primary.light">
              gneri94@gmail.com
            </Text>
            <Text variant={"h6"} weight={500} color="primary.light">
              Rua Avenida Professor Alberto Vollet Sachs
            </Text>
            <IconButton onClick={(e) => {
              navigate('/cart')
            }} edge="end" sx={{color: theme.palette.primary.dark}} ><InstagramIcon sx={{ fontSize: "50px", color: theme.palette.primary.dark }} /></IconButton>
            <IconButton onClick={(e) => {
              navigate('/cart')
            }} edge="end" sx={{color: theme.palette.primary.dark}} ><WhatsAppIcon sx={{ fontSize: "50px", color: theme.palette.primary.dark }} /></IconButton>
            <IconButton onClick={(e) => {
              navigate('/cart')
            }} edge="end" sx={{color: theme.palette.primary.dark}} ><MailOutlineIcon sx={{ fontSize: "50px", color: theme.palette.primary.dark }} /></IconButton>
            <IconButton onClick={(e) => {
              navigate('/cart')
            }} edge="end" sx={{color: theme.palette.primary.dark}}><FacebookIcon sx={{ fontSize: "50px", color: theme.palette.primary.dark }} /></IconButton>
          </Grid>
          <Grid item xs={4}>
            <Text variant={"h3"} weight={500} color="primary.light">
              {'Informações'}
            </Text>
            <Text variant={"h6"} weight={500} color="primary.light">
              {'Produtos'}
            </Text>
            <Text variant={"h6"} weight={500} color="primary.light">
              {'Consultoria'}
            </Text>
            <Text variant={"h6"} weight={500} color="primary.light">
              {'Sobre nós'}
            </Text>
          </Grid>
        </Grid>
      </BottomNavigation>
    </>
  )
};
export default DefaultFooter;
