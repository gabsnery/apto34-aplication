import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
} from "@mui/material";
import { useResponsive } from "hooks";
//import { Link } from 'react-router-dom'

import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGetCoverQuery } from "store/api/product";
import { Product } from "store/api/product/product.interface";
import { useTheme } from "styled-components";
import { Text } from "ui-layout";
import { signed_files_expiration } from "utils";

export const ProductsCard: React.FC<{ value: Product; dragging?: boolean }> = ({
  value,
  dragging,
}) => {
  const { t } = useTranslation(["product", "translation"]);
  const theme = useTheme();
  const { isSm, isMd, isXs } = useResponsive();

  const navigate = useNavigate();
  const handleOnItemClick = useCallback(
    (e: any) => {
      if (dragging) e.stopPropagation();
    },
    [dragging]
  );
  const { data: photoData, isLoading,isSuccess } = useGetCoverQuery(
    value.id || 0,
    {
      skip: value.id === undefined,
      pollingInterval: signed_files_expiration,
    }
  );
  return (
    <>
      <Box onClickCapture={handleOnItemClick}>
        <Card sx={{ boxShadow: 4, backgroundColor: theme.paper.default }}>
          <CardActionArea
            component="a"
            onClick={(e) => {
              handleOnItemClick(e);
              navigate(`/product/${value.id}`);
            }}
          >
            {photoData && isSuccess && (
              <CardMedia
                component="img"
                height={isXs ? "200px" : "300px"}
                image={photoData?.url}
                alt={value.nome}
              />
            )}
            {isLoading&&<Skeleton variant="rectangular" width="100%" height={isXs ? "200px" : "300px"}/>}
            <CardContent>
              <div style={{ height: "3rem" }}>
                <Text color="primary" variant="h5">
                  {t(`name_${value.id}`)}
                </Text>
              </div>
              <Grid
                container
                alignItems="center"
                sx={{height:'2rem'}}
                mt={3}
                justifyContent="space-between"
              >
                <Grid item xs={6} container>
                  {value.discount > 0 && (
                    <Text
                      variant="body"
                      color="error"
                      style={{ textDecoration: "line-through" }}
                    >
                      {`R$ ${(+value.valor_produto).toFixed(2)}`}
                    </Text>
                  )}
                  <Text variant="body" color="secondary">
                    {`R$ ${(
                      +value.valor_produto *
                      ((100 - value.discount) / 100)
                    ).toFixed(2)}`}
                  </Text>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );
};

export default ProductsCard;
