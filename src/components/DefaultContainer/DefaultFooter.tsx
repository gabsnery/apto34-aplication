import { BottomNavigation,Box, Grid } from "@mui/material";

import logo from "assets/img/logo-sl-horizontal.svg";
import logoDark from "assets/img/logo-sl-horizontal_dark.svg";
import useResponsive from "hooks/useResponsive";
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

  const {isSm,isMd,isXs} =useResponsive()

  return (
    <>
      <Box
        component={"footer"}
        sx={{
          backgroundColor: theme.paper.primaryDark,
          height: "fit-content",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <Grid
          container
          direction="row"
          paddingX={{xs:theme.spacing.medium , md:theme.spacing.extraLarge}} 
          sx={{
            display: "flex",
          }}
        >
          <Grid item xs={12} sm={3} textAlign={"left"}>
            <img src={activeTheme==='light'? logo:logoDark} alt="logo" style={{ height: isXs?60:isSm?100:150 }} />
          </Grid>
          <Grid item container xs={12} sm={3} textAlign={"right"}  direction={"column"}>
            <Text variant={"h3"}  color="primary">
              {t('footer.contactLabel')}
            </Text>
            <Text variant={"h6"}  color="primary">
              {t('footer.phone')}
            </Text>
            <Text variant={"h6"}  color="primary">
              {t('footer.email')}
            </Text>
          </Grid>
          <Grid item container xs={12} sm={3} textAlign={"right"}  direction={"column"}>
            <Text variant={"h3"}  color="primary">
              {t('footer.contactLabel')}
            </Text>
            <Text variant={"h6"}  color="primary">
              {t('footer.phone')}
            </Text>
            <Text variant={"h6"}  color="primary">
              {t('footer.email')}
            </Text>
          </Grid>
          <Grid item container xs={12} md={3}  textAlign={"right"} direction={'column'}>
            <Text variant={"h3"}  color="primary">
              {t('footer.infoLabel')}
            </Text>
            <Text variant={"h5"}  color="primary">
              {t('footer.productsLabel')}
            </Text>
            <Text variant={"h5"}  color="primary">
              {t('footer.aboutUsLabel')}
            </Text>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default DefaultFooter;
