import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  BadgeProps,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@mui/material";

import logo from "assets/img/logo-sl-horizontal.svg";
import React, { FC, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
//import minerva from 'assets/img/minerva-logo-white.png'
import styled from "@emotion/styled";
import LightMode from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import { styled as MUIStyled } from "@mui/material/styles";
import logoDark from "assets/img/logo-sl-horizontal_dark.svg";
import { useTypedSelector } from "hooks";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { changeLanguage } from "store/slices/languageSlice";
import { logout } from "store/slices/logout";
import { changeTheme } from "store/slices/themeSlice";
import { RootState, useAppDispatch } from "store";
import { useTheme } from "styled-components";
import { Button, Text } from "ui-layout";
import items, { NavObj } from "./nav";

const DefaultHeader: FC<React.PropsWithChildren<{}>> = () => {
  const { t } = useTranslation();
  const language = useSelector((st: RootState) => st.language);

  const theme = useTheme();
  const navigate = useNavigate();
  const cart = useSelector((st: RootState) => st.cart);
  const token = useTypedSelector(({ auth }) => auth.token);
  const userTheme = useSelector((st: RootState) => st.theme);

  const dispatch = useAppDispatch();

  const [drawerIsOpen, setdrawerIsOpen] = useState<boolean>(false);
  const drawerWidth = 300;

  const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    "& .MuiBadge-badge": {
      right: 0,
      top: 3,
      fontSize: "10px",
      height: "16px",
      minHeight: "16px",
      width: "16px",
      minWidth: "16px",
      backgroundColor: theme.colors.primary,
    },
  }));
  const ToggleButton = MUIStyled(MuiToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: theme.paper.selected,
    },
  });

  return (
    <>
      <AppBar
        elevation={0}
        position="sticky"
        sx={{
          height: "auto",
          backdropFilter: "blur(6px)",
          backgroundColor: theme.colors.background,
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
              backgroundColor: theme.colors.background,
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
                      setdrawerIsOpen(false);
                      navigate(item.link);
                    }}
                    sx={{
                      color: "#676767",
                      margin: "10px 0",
                      padding: "0 20px",
                    }}
                  >
                    <Text variant={"body"} color={"secondary"}>
                      {t(item.name)}
                    </Text>
                  </ListItemButton>
                </React.Fragment>
              );
            })}
            {token && (
              <ListItemButton
                onClick={() => {
                  setdrawerIsOpen(false);
                  navigate("/orders");
                }}
                sx={{
                  color: "#676767",
                  margin: "10px 0",
                  padding: "0 20px",
                }}
              >
                <Text variant={"body"} color={"secondary"}>
                  {t("orders")}
                </Text>
              </ListItemButton>
            )}
            <ToggleButtonGroup
              size="small"
              value={language}
              exclusive
              onChange={(ev, newAlignment) => {
                localStorage.setItem("@app:activeLanguage", newAlignment);
                window.location.reload();
              }}
              aria-label="Platform"
            >
              <ToggleButton
                value="pt-BR"
                sx={{ borderColor: theme.text.secondary }}
              >
                <Text variant={"body2"} color={"secondary"}>
                  {t("pt")}
                </Text>
              </ToggleButton>
              <ToggleButton
                value="en-US"
                sx={{ borderColor: theme.text.secondary }}
              >
                <Text variant={"body2"} color={"secondary"}>
                  {t("en")}
                </Text>
              </ToggleButton>
            </ToggleButtonGroup>
          </List>
        </Drawer>
        <Toolbar>
          <RouterLink to="/">
            <img
              src={userTheme === "light" ? logo : logoDark}
              alt="logo"
              style={{ height: 60, marginTop: 10, marginBottom: 5 }}
            />
          </RouterLink>
          {token && (
            <Button
              variant="tertiary"
              onClick={() => {
                dispatch(logout());
              }}
            >
              {t("logout")}
            </Button>
          )}
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
                  display={{ xs: "none", md: "block" }}
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
                    {t(item.name)}
                  </Button>
                </Grid>
              );
            })}
            {token && (
              <Grid
                display={{ xs: "none", md: "block" }}
                sx={{
                  alignContent: "center",
                }}
                item
              >
                <Button
                  variant="tertiary"
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  {t("orders")}
                </Button>
              </Grid>
            )}
            <Grid item mx={2}>
              <StyledBadge badgeContent={cart.items.length}>
                <IconButton
                  onClick={(e) => {
                    navigate("/cart");
                  }}
                  edge="end"
                  size="medium"
                >
                  <ShoppingCartIcon
                    fontSize="inherit"
                    sx={{ color: theme.icon.primary }}
                  />
                </IconButton>
              </StyledBadge>
            </Grid>
            <Grid item mx={2} display={{ xs: "none", sm: "block" }}>
              <ToggleButtonGroup
                size="small"
                value={language}
                exclusive
                onChange={(ev, newAlignment) => {
                  dispatch(changeLanguage(newAlignment));
                }}
                aria-label="Platform"
              >
                <ToggleButton
                  value="pt-BR"
                  sx={{ borderColor: theme.text.secondary }}
                >
                  <Text variant={"body2"} color={"secondary"}>
                    {t("pt")}
                  </Text>
                </ToggleButton>
                <ToggleButton
                  value="en-US"
                  sx={{ borderColor: theme.text.secondary }}
                >
                  <Text variant={"body2"} color={"secondary"}>
                    {t("en")}
                  </Text>
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item mx={2}>
              <IconButton
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  /*   localStorage.setItem(
                    "@app:activeTheme",
                    activeTheme === "light" ? "dark" : "light"
                  ); */
                  dispatch(
                    changeTheme(userTheme === "light" ? "dark" : "light")
                  );
                }}
              >
                <LightMode sx={{ color: theme.icon.primary }} />
              </IconButton>
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
                <MenuIcon
                  height={25}
                  width={25}
                  fontSize="inherit"
                  sx={{ color: theme.icon.primary }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default DefaultHeader;
