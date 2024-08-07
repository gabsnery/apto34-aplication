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
          minHeight: "300px",
          height: "fit-content",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <Grid
          container
          direction="row"
          p={theme.spacing.large} 
          sx={{
            display: "flex",
          }}
        >
          <Grid item xs={3} sm={4} textAlign={"center"}>
            <img src={activeTheme==='light'? logo:logoDark} alt="logo" style={{ height: isXs?100:200 }} />
          </Grid>
          <Grid item container xs={9} sm={4}  direction={"column"}>
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
          <Grid item container xs={12} md={4}  direction={'column'}>
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
