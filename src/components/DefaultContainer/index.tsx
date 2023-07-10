import { Container, useTheme } from "@mui/material";
import React, { FC, Suspense } from "react";
import Loading from "../Loading";
import DefaultHeader from "./DefaultHeader";
import DefaultFooter from "./DefaultFooter";

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
        <Container maxWidth={false} disableGutters={true}
          sx={{
            backgroundColor: theme.palette.background.default,
            marginTop:'15px',
          }}>
          {props.children}
        </Container>
        <DefaultFooter/>
      </Suspense>
    </>
  );
};

export default DefaultContainer;

