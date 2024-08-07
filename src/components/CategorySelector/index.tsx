// src/components/Banner.tsx
import { AppBar, Box } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetCategoriasQuery } from "store/api/category";
import { clearFilter } from "store/slices/sessionFilterSlice";
import { useTheme } from "styled-components";
import { Button } from "ui-layout";

const CategorySelector: React.FC = () => {
  const theme = useTheme();
  const { data: categorias } = useGetCategoriasQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        height: "auto",
        backdropFilter: "blur(6px)",
        backgroundColor: theme.colors.background,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {categorias?.map((categoria) => (
          <Button
            key={categoria.id}
            onClick={() => {
              dispatch(clearFilter());
              navigate(`/store/${categoria.categoria}`);
            }}
            variant="tertiary"
          >
            {categoria.categoria}
          </Button>
        ))}
      </Box>
    </AppBar>
  );
};

export default CategorySelector;
