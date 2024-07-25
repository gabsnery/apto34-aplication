import { BottomNavigation, Grid, useTheme } from "@mui/material";

import logo from "assets/img/logo-sl-horizontal.svg";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
//import minerva from 'assets/img/minerva-logo-white.png'
import { Text } from "ui-layout";
const DefaultFooter: FC<React.PropsWithChildren<{}>> = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <BottomNavigation
        component={"footer"}
        sx={{
          backgroundColor: theme.palette.primary.main,
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
            <Text variant={"h3"} weight={500} color="primary.light">
              {"Contato"}
            </Text>
            <Text variant={"h6"} weight={500} color="primary.light">
              (19) 98262-8074
            </Text>
            <Text variant={"h6"} weight={500} color="primary.light">
              gneri94@gmail.com
            </Text>
          </Grid>
          <Grid item xs={12} md={4}>
            <Text variant={"h3"} weight={500} color="primary.light">
              {"Informações"}
            </Text>
            <Text variant={"h6"} weight={500} color="primary.light">
              {"Produtos"}
            </Text>
            <Text variant={"h6"} weight={500} color="primary.light">
              {"Consultoria"}
            </Text>
            <Text variant={"h6"} weight={500} color="primary.light">
              {"Sobre nós"}
            </Text>
          </Grid>
        </Grid>
      </BottomNavigation>
    </>
  );
};
export default DefaultFooter;
