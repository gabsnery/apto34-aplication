import { Container, useTheme, AppBar, Toolbar, Typography } from "@mui/material";
import React, { FC, Suspense } from "react";
import Loading from "../Loading";
import { Button, Select } from "ui-layout";
import { mockFilter } from "./mock";
import { RootState, useAppDispatch } from "store/store";
import { useSelector } from "react-redux";
import { addFilter, clearFilter, removeFilter } from "store/slices/sessionFilterSlice";
import { useGetColorsQuery } from "store/api/color";
import { useGetSizesQuery } from "store/api/size";
import { useGetCategoriasQuery, useGetSubCategoriasQuery } from "store/api/category";

const FilterBar: FC<React.PropsWithChildren<unknown>> = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const sessionFilter = useSelector((st: RootState) => st.sessionFilter)
  const { data: colors } = useGetColorsQuery()
  const { data: sizes } = useGetSizesQuery()
  const { data: categorias } = useGetCategoriasQuery()
  const { data:subCategorias  } = useGetSubCategoriasQuery()


  return (
    <>
      <Toolbar>
        <Select
          name={'categoryId'}
          label="Categoria"
          sx={{ backgroundColor: 'transparent' }}
          fullWidth
          type="multiple"
          value={sessionFilter?.category?.map(i => i.toString())}
          onChange={(e) => {
            const array = sessionFilter.category
            const index = array.indexOf(+(e.target.value as string));
            if (index >= 0)
              dispatch(removeFilter({ filter: 'category', index: index }))
            else
              dispatch(addFilter({ filter: 'category', value: +(e.target.value as string) }))
          }}
          options={categorias?.map((item) => ({ value: item.id.toString(), label: item.categoria })) || []}
          />
        <Select
          name={'categoryId'}
          label="Tipo"
          sx={{ backgroundColor: 'transparent' }}
          fullWidth
          type="multiple"
          value={sessionFilter?.type?.map(i => i.toString())}
          onChange={(e) => {
            const array = sessionFilter.type
            const index = array.indexOf(+(e.target.value as string));
            if (index >= 0)
              dispatch(removeFilter({ filter: 'type', index: index }))
            else
              dispatch(addFilter({ filter: 'type', value: +(e.target.value as string) }))
          }}
          options={subCategorias?.map((item) => ({ value: item.id.toString(), label: item.descricao_subcategoria })) || []}
        />
        <Select
          name={'categoryId'}
          label="Cor"
          sx={{ backgroundColor: 'transparent' }}
          fullWidth
          type="multiple"
          value={sessionFilter?.color?.map(i => i.toString())}
          onChange={(e) => {
            const array = sessionFilter.color
            const index = array.indexOf(+(e.target.value as string));
            if (index >= 0)
              dispatch(removeFilter({ filter: 'color', index: index }))
            else
              dispatch(addFilter({ filter: 'color', value: +(e.target.value as string) }))
          }}
          options={colors?.map((item: any) => ({ value: item.id.toString(), label: item.descricao || '' })) || []}
          />
        <Select
          name={'categoryId'}
          label="Tamanho"
          sx={{ backgroundColor: 'transparent' }}
          fullWidth
          type="multiple"
          value={sessionFilter?.size?.map(i => i.toString())}
          onChange={(e) => {
            const array = sessionFilter.size
            const index = array.indexOf(+(e.target.value as string));
            if (index >= 0)
              dispatch(removeFilter({ filter: 'size', index: index }))
            else
              dispatch(addFilter({ filter: 'size', value: +(e.target.value as string) }))
          }}
          options={sizes?.map((item: any) => ({ value: item.id.toString(), label: item.descricao || '' })) || []}
          />

        <Button variant='text' color="primary" onClick={() => {
          dispatch(clearFilter())

        }}> apaga </Button>
      </Toolbar>
    </>
  );
};

export default FilterBar;

