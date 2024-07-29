import { BottomNavigation, Grid, useTheme } from "@mui/material";

import logo from "assets/img/logo-sl-horizontal.svg";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
//import minerva from 'assets/img/minerva-logo-white.png'
import { Text } from "ui-layout";
import { lightTheme } from "ui-layout/theme";
const DefaultFooter: FC<React.PropsWithChildren<{}>> = () => {
  const navigate = useNavigate();

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
            <Text variant={"h3"} weight={500} color="terciary">
              {"Contato"}
            </Text>
            <Text variant={"h6"} weight={500} color="terciary">
              (19) 98262-8074
            </Text>
            <Text variant={"h6"} weight={500} color="terciary">
              gneri94@gmail.com
            </Text>
          </Grid>
          <Grid item xs={12} md={4}>
            <Text variant={"h3"} weight={500} color="terciary">
              {"Informações"}
            </Text>
            <Text variant={"h5"} weight={500} color="terciary">
              {"Produtos"}
            </Text>
            <Text variant={"h5"} weight={500} color="terciary">
              {"Consultoria"}
            </Text>
            <Text variant={"h5"} weight={500} color="terciary">
              {"Sobre nós"}
            </Text>
          </Grid>
        </Grid>
      </BottomNavigation>
    </>
  );
};
export default DefaultFooter;
