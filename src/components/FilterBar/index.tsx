import { Grid, useTheme, AppBar, Toolbar, Typography } from "@mui/material";
import React, { FC, Suspense } from "react";
import Loading from "../Loading";
import { Button, Select } from "ui-layout";
import { mockFilter } from "./mock";
import { RootState, useAppDispatch } from "store/store";
import { useSelector } from "react-redux";
import {
  addFilter,
  clearFilter,
  clearOneFilter,
  removeFilter,
} from "store/slices/sessionFilterSlice";
import { useGetColorsQuery } from "store/api/color";
import { useGetSizesQuery } from "store/api/size";
import {
  useGetCategoriasQuery,
  useGetSubCategoriasQuery,
} from "store/api/category";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const FilterBar: FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sessionFilter = useSelector((st: RootState) => st.sessionFilter);
  const { data: colors } = useGetColorsQuery();
  const { data: sizes } = useGetSizesQuery();
  const { data: categorias } = useGetCategoriasQuery();
  const { data: subCategorias } = useGetSubCategoriasQuery();
  const { category } = useParams<{ category: string }>();

  return (
    <>
          <Grid item xs={12} sm={6} md={12}>
            <Select
              name={"category"}
              label={t("category")}
              sx={{ backgroundColor: "transparent" }}
              size={'small'}
              type="multiple"
              value={sessionFilter?.category.length>0?sessionFilter?.category?.map((i) => i.toString()):''}
              onChange={(e) => {
                const array = sessionFilter.category;
                const index = array.indexOf(+(e.target.value as string));
                if (index >= 0)
                  dispatch(removeFilter({ filter: "category", index: index }));
                else
                  dispatch(
                    addFilter({
                      filter: "category",
                      value: +(e.target.value as string),
                    })
                  );
              }}
              options={
                categorias?.map((item) => ({
                  value: item.id.toString(),
                  label: item.categoria,
                })) || []
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <Select
              name={"type"}
              label={t("type")}
              sx={{ backgroundColor: "transparent" }}
              size={'small'}
              type="multiple"
              value={sessionFilter?.type.length>0?sessionFilter?.type?.map((i) => i.toString()):''}
              onChange={(e) => {
                const array = sessionFilter.type;
                const index = array.indexOf(+(e.target.value as string));
                if (index >= 0)
                  dispatch(removeFilter({ filter: "type", index: index }));
                else
                  dispatch(
                    addFilter({
                      filter: "type",
                      value: +(e.target.value as string),
                    })
                  );
              }}
              options={
                subCategorias?.filter(item=>category===""||item.categoria?.categoria===category).map((item) => ({
                  value: item.id.toString(),
                  label: `${item.subcategoria}`,
                })) || []
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <Select
              name={"color"}
              label={t("color")}
              sx={{ backgroundColor: "transparent" }}
              size={'small'}
              type="multiple"
              value={sessionFilter?.color?.length>0?sessionFilter?.color?.map((i) => i.toString()):''}
              onChange={(e) => {
                const array = sessionFilter.color;
                const index = array.indexOf(+(e.target.value as string));
                if (index >= 0)
                  dispatch(removeFilter({ filter: "color", index: index }));
                else
                  dispatch(
                    addFilter({
                      filter: "color",
                      value: +(e.target.value as string),
                    })
                  );
              }}
              options={
                colors?.map((item: any) => ({
                  value: item.id.toString(),
                  label: item.descricao || "",
                })) || []
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <Select
              name={"size"}
              label={t("size")}
              sx={{ backgroundColor: "transparent" }}
              size={'small'}
              type="multiple"
              value={sessionFilter?.size?.length>0?sessionFilter?.size?.map((i) => i.toString()):''}
              onChange={(e) => {
                const array = sessionFilter.size;
                const index = array.indexOf(+(e.target.value as string));
                if (index >= 0)
                  dispatch(removeFilter({ filter: "size", index: index }));
                else
                  dispatch(
                    addFilter({
                      filter: "size",
                      value: +(e.target.value as string),
                    })
                  );
              }}
              options={
                sizes?.map((item: any) => ({
                  value: item.id.toString(),
                  label: item.descricao || "",
                })) || []
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <Button
              variant="tertiary" 
              onClick={() => {
                dispatch(clearOneFilter({filter:'type'}));
                dispatch(clearOneFilter({filter:'color'}));
                dispatch(clearOneFilter({filter:'size'}));
              }}
            >
              {t('clear')}
            </Button>
          </Grid>
    </>
  );
};

export default FilterBar;
