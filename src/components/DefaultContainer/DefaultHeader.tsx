import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  Drawer,
  Toolbar,
  useTheme,
  List,
  ListItemButton,
  BadgeProps,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { lightTheme as theme } from "ui-layout/theme";

import logo from "assets/img/logo-sl-horizontal.svg";
import React, { FC, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
//import minerva from 'assets/img/minerva-logo-white.png'
import items, { NavObj } from "./nav";
import { Button, Text } from "ui-layout";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/store";
import { logout } from "store/slices/logout";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

const DefaultHeader: FC<React.PropsWithChildren<{}>> = () => {
  const { t } = useTranslation();

  const mui_theme = useTheme();
  const navigate = useNavigate();
  const cart = useSelector((st: RootState) => st.cart);
  const dispatch = useAppDispatch();
  const [drawerIsOpen, setdrawerIsOpen] = useState<boolean>(false);
  const drawerWidth = 300;
  const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    "& .MuiBadge-badge": {
      right: 3,
      top: 13,
      backgroundColor: theme.colors.primary,
    },
  }));
  return (
    <>
      <AppBar
        elevation={0}
        position="sticky"
        sx={{
          height: "100px",
          backdropFilter: "blur(6px)",
          backgroundColor: mui_theme.palette.background.default,
          zIndex: (mui_theme) => mui_theme.zIndex.drawer + 1,
        }}
      >
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={drawerIsOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          onClose={(ev, reason) => {
            setdrawerIsOpen(false);
          }}
        >
          <List sx={{ margin: "25px", paddingTop: "80px" }}>
            {items.map((item: NavObj, idx: number) => {
              return (
                <React.Fragment key={idx}>
                  <ListItemButton
                    onClick={() => {
                      navigate(item.link);
                    }}
                    sx={{
                      color: "#676767",
                      margin: "10px 0",
                      padding: "0 20px",
                    }}
                  >
                    {item.name}
                  </ListItemButton>
                </React.Fragment>
              );
            })}
          </List>
        </Drawer>
        <Toolbar>
          <RouterLink to="/">
            <img src={logo} alt="logo" style={{ height: 100, marginTop: 10 }} />
          </RouterLink>
          <Button
            variant="tertiary"
            onClick={() => {
              dispatch(logout());
            }}
          >
            {t('logout')}
          </Button>
          <Grid
            container
            rowSpacing={2}
            direction="row"
            sx={{
              display: "flex",
              marginLeft: "auto",
              justifyContent: "end",
            }}
          >
            {items.map((item: NavObj, idx: number) => {
              return (
                <Grid
                  display={{ xs: "none", sm: "block" }}
                  sx={{
                    alignContent: "center",
                  }}
                  item
                  key={idx}
                >
                  <Button
                    key={idx}
                    variant="tertiary"
                    onClick={() => {
                      navigate(item.link);
                    }}
                  >
                    {item.name}
                  </Button>
                </Grid>
              );
            })}
            <Grid item mx={2}>
              <StyledBadge badgeContent={cart.items.length}>
                <IconButton
                  onClick={(e) => {
                    navigate("/cart");
                  }}
                  edge="end"
                  size="large"
                >
                  <ShoppingCartIcon fontSize="inherit" color="action" />
                </IconButton>
              </StyledBadge>
            </Grid>
      {/*       <Grid
              item
              sx={{
                alignContent: "center",
              }}
            >
              <Text color="secondary">{`Olá, ${"Fulana"}`}</Text>
            </Grid> */}

            <Grid
              item
              sx={{
                padding: "13px",
                display: { xs: "block", md: "none" },
                alignContent: "center",
              }}
            >
              <IconButton
                onClick={(e) => {
                  setdrawerIsOpen(!drawerIsOpen);
                }}
                edge="end"
                size="large"
              >
                <MenuIcon height={25} width={25} fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default DefaultHeader;
