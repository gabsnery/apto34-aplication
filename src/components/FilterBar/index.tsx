import { Container, useTheme, AppBar, Toolbar, Typography } from "@mui/material";
import React, { FC, Suspense } from "react";
import Loading from "../Loading";
import { Select } from "ui-layout";
import { mockFilter } from "./mock";
import { RootState, useAppDispatch } from "store/store";
import { useSelector } from "react-redux";
import { addFilter } from "store/slices/sessionFilterSlice";

const FilterBar: FC<React.PropsWithChildren<unknown>> = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const sessionFilter = useSelector((st: RootState) => st.sessionFilter)
  console.log("🚀 ~ file: index.tsx:14 ~ sessionFilter:", sessionFilter)

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Select
            name={'categoryId'}
            sx={{ backgroundColor: 'transparent' }}
            fullWidth
            type="multiple"
             value={sessionFilter?.category?.map(i=>i.toString())}
             onChange={(e) => {
             console.log("🚀 ~ file: index.tsx:20 ~ e:", e)
             dispatch(addFilter({filter:'category',value:+(e.target.value as string)}))
             }} 
            options={Object.keys(mockFilter.category).map((item) => ({ value: item.toString(), label: mockFilter.category[item as keyof typeof mockFilter.category]||'' })) || []}
          />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default FilterBar;

