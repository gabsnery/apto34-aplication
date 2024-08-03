import { BottomNavigation, Grid } from "@mui/material";

import logo from "assets/img/logo-sl-horizontal.svg";
import logoDark from "assets/img/logo-sl-horizontal_dark.svg";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { Text } from "ui-layout";
const DefaultFooter: FC<React.PropsWithChildren<{}>> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const activeTheme =
    (localStorage.getItem("@app:activeTheme") as "light" | "dark") || "light";
  return (
    <>
      <BottomNavigation
        component={"footer"}
        sx={{
          backgroundColor: theme.paper.primaryDark,
          minHeight: "300px",
          height: "fit-content",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <Grid
          container
          direction="row"
          sx={{
            display: "flex",
          }}
        >
          <Grid item xs={12} sm={4} textAlign={"center"}>
            <img src={activeTheme==='light'? logo:logoDark} alt="logo" style={{ height: 300 }} />
          </Grid>
          <Grid item container xs={12} sm={4} direction={"column"}>
            <Text variant={"h3"} weight={500} color="primary">
              {t('footer.contactLabel')}
            </Text>
            <Text variant={"h6"} weight={500} color="primary">
              {t('footer.phone')}
            </Text>
            <Text variant={"h6"} weight={500} color="primary">
              {t('footer.email')}
            </Text>
          </Grid>
          <Grid item container xs={12} md={4} direction={'column'}>
            <Text variant={"h3"} weight={500} color="primary">
              {t('footer.infoLabel')}
            </Text>
            <Text variant={"h5"} weight={500} color="primary">
              {t('footer.productsLabel')}
            </Text>
            <Text variant={"h5"} weight={500} color="primary">
              {t('footer.aboutUsLabel')}
            </Text>
          </Grid>
        </Grid>
      </BottomNavigation>
    </>
  );
};
export default DefaultFooter;
