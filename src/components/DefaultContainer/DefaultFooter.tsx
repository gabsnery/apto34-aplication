import { BottomNavigation, Grid } from "@mui/material";

import logo from "assets/img/logo-sl-horizontal.svg";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Text } from "ui-layout";
import { lightTheme } from "ui-layout/theme";
const DefaultFooter: FC<React.PropsWithChildren<{}>> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <BottomNavigation
        component={"footer"}
        sx={{
          backgroundColor: lightTheme.colors.primary,
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
            <img src={logo} alt="logo" style={{ height: 300 }} />
          </Grid>
          <Grid item container xs={12} sm={4} direction={"column"}>
            <Text variant={"h3"} weight={500} color="primary">
              {"Contato"}
            </Text>
            <Text variant={"h6"} weight={500} color="primary">
              {t('footer:phone')}
            </Text>
            <Text variant={"h6"} weight={500} color="primary">
              {t('footer:email')}
            </Text>
          </Grid>
          <Grid item container xs={12} md={4} direction={'column'}>
            <Text variant={"h3"} weight={500} color="primary">
              {"Informações"}
            </Text>
            <Text variant={"h5"} weight={500} color="primary">
              {"Produtos"}
            </Text>
            <Text variant={"h5"} weight={500} color="primary">
              {"Consultoria"}
            </Text>
            <Text variant={"h5"} weight={500} color="primary">
              {"Sobre nós"}
            </Text>
          </Grid>
        </Grid>
      </BottomNavigation>
    </>
  );
};
export default DefaultFooter;
