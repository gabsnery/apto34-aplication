import { Container, useTheme } from "@mui/material";
import React, { FC, Suspense } from "react";
import Loading from "../Loading";
import DefaultHeader from "./DefaultHeader";
import DefaultFooter from "./DefaultFooter";
import SnackbarHandler from "components/SnackbarHandler";

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
            backgroundColor: theme.palette.background.default,
            marginTop: "15px",
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
