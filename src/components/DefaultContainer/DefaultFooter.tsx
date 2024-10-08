import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import logo from "assets/img/logo-sl-horizontal.svg";
import logoDark from "assets/img/logo-sl-horizontal_dark.svg";
import { useResponsive } from "hooks";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import { useTheme } from "styled-components";
import { Button, Text } from "ui-layout";
const DefaultFooter: FC<React.PropsWithChildren<{}>> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const activeTheme = useSelector((st: RootState) => st.theme);

  const { isSm, isMd, isXs } = useResponsive();

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
          paddingX={{ xs: theme.spacing.medium, md: theme.spacing.extraLarge }}
          sx={{
            display: "flex",
          }}
        >
          <Grid item xs={12} sm={3} textAlign={"left"}>
            <img
              src={activeTheme === "light" ? logo : logoDark}
              alt="logo"
              style={{ height: isXs ? 60 : isSm ? 100 : 150 }}
            />
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={3}
            textAlign={"right"}
            direction={"column"}
          >
            <Text variant={"h3"} color="terciary">
              {t("footer.documentation")}
            </Text>
            <Button
              variant={"tertiary"}
              onClick={() => {
                window.open(
                  "https://66bad33b77c851ae114b8747-klnuntyxco.chromatic.com/",
                  "_blank",
                  "noreferrer"
                );
              }}
            >
              <Text variant={"h6"} color="terciary">
                {t("footer.storybook")}
              </Text>
            </Button>
            <Button
              variant={"tertiary"}
              onClick={() => {
                window.open(
                  "https://www.figma.com/design/ILO04OH2SekErWcaDYEzt8/Untitled?node-id=0-1",
                  "_blank",
                  "noreferrer"
                );
              }}
            >
              <Text variant={"h6"} color="terciary">
                {t("footer.figma")}
              </Text>
            </Button>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={3}
            textAlign={"right"}
            direction={"column"}
          >
            <Text variant={"h3"} color="terciary">
              {t("footer.contactLabel")}
            </Text>
            <Text variant={"h6"} color="terciary">
              {t("footer.phone")}
            </Text>
            <Text variant={"h6"} color="terciary">
              {t("footer.email")}
            </Text>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={3}
            textAlign={"right"}
            direction={"column"}
          >
            <Text variant={"h3"} color="terciary">
              {t("footer.infoLabel")}
            </Text>
            <Text variant={"h5"} color="terciary">
              {t("footer.productsLabel")}
            </Text>
            <Text variant={"h5"} color="terciary">
              {t("footer.aboutUsLabel")}
            </Text>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default DefaultFooter;
