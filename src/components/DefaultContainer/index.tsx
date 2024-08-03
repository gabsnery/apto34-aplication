import { Container } from "@mui/material";
import React, { FC, Suspense } from "react";
import Loading from "../Loading";
import DefaultHeader from "./DefaultHeader";
import DefaultFooter from "./DefaultFooter";
import SnackbarHandler from "components/SnackbarHandler";
import { useTheme } from "styled-components";

const DefaultContainer: FC<
  React.PropsWithChildren<{
    children: NonNullable<React.ReactNode>;
  }>
> = (props) => {
  const theme = useTheme();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <DefaultHeader />
        <Container
          maxWidth={false}
          disableGutters={true}
          sx={{
            backgroundColor: theme.colors.background,
            paddingTop: "15px",
            paddingBottom: "25px",
            textAlign: "center",
            minHeight: "calc(100vh - 460px)"
          }}
        >
          <SnackbarHandler />
          {props.children}
        </Container>
      </Suspense>
      <DefaultFooter />
    </>
  );
};

export default DefaultContainer;
