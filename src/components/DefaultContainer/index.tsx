import { Container } from "@mui/material";
import CookiesConsent from "components/CookiesConsent";
import SnackbarHandler from "components/SnackbarHandler";
import React, { FC, Suspense } from "react";
import { useTheme } from "styled-components";
import DefaultFooter from "./DefaultFooter";
import DefaultHeader from "./DefaultHeader";

const DefaultContainer: FC<
  React.PropsWithChildren<{
    children: NonNullable<React.ReactNode>;
  }>
> = (props) => {

  const theme = useTheme();
  return (
    <>
      <Suspense>
        <DefaultHeader />
        <Container
          maxWidth={false}
          disableGutters={true}
          sx={{
            backgroundColor: theme.colors.background,
            paddingTop: "15px",
            paddingBottom: "25px",
            paddingLeft: {sx:0,md:"50px",lg:"150px"},
            paddingRight: {sx:0,md:"50px",lg:"150px"},
            textAlign: "center",
            minHeight: "calc(100vh - 293px)",
          }}
        >
          <SnackbarHandler />
          {props.children}
        </Container>
      </Suspense>
      <DefaultFooter />
     <CookiesConsent/>
    </>
  );
};

export default DefaultContainer;
