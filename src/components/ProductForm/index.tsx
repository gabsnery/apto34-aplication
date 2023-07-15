import { Grid, useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import ProductsCard from "components/ProductCard";
import { Product } from "store/api/product/product.interface";
import { useState, useEffect } from "react";
import { TextField, Select, Button } from "ui-layout";
import { useGetCategoriasQuery } from "store/api/category";
import { useUpdateAddProductMutation } from "store/api/product";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const ProductForm: React.FC<React.PropsWithChildren<unknown>> = () => {
    const { t } = useTranslation(["login", "common"]);
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<Partial<Product>>({})

    const { data: categorias } = useGetCategoriasQuery()
    const [updateAddProduct, { isSuccess }] = useUpdateAddProductMutation()

    const theme = useTheme();
    useEffect(() => {

        isSuccess && alert(isSuccess)
    }, [isSuccess]);
    return (
        <Grid
            container
            direction="row"
            rowSpacing={2}
            columnSpacing={3}
            sx={{
                backgroundColor: theme.palette.background.default,
                height: "inherit",
                px: '50px',

            }}
        >
            <TextField
                label={t("name")}
                onChange={(ev) => setFormData({ ...formData, nome: ev.target.value })}
                value={formData.nome || ''}
                required
                fullWidth
            />
            <TextField
                label={t("value")}
                type="number"
                onChange={(ev) => setFormData({ ...formData, valor_produto: +ev.target.value })}
                value={formData.valor_produto || ''}
                required
                fullWidth
            />
            <Select
                name={'categoryId'}
                label="Tipo"
                sx={{ backgroundColor: 'transparent' }}
                fullWidth
                type="multiple"
                value={formData.produtoSubcategoria?.map(i => i.id?.toString()) || []}
                onChange={(e) => {
                    console.log("🚀 ~ file: index.tsx:20 ~ e:", e.target.value)
                    const array = formData.produtoSubcategoria || []
                    console.log("🚀 ~ file: index.tsx:60 ~ array:", array)
                    const index = array.findIndex((ite) => ite.id === +(e.target.value as string));
                    console.log("🚀 ~ file: index.tsx:61 ~ index:", index)
                    if (categorias) {
                        if (index >= 0) {
                            array?.splice(index, 1);
                            setFormData({ ...formData, produtoSubcategoria: array })
                        } else {
                            console.log("🚀 ~ file: index.tsx:68 ~ categorias?.filter(ite => ite.id === +(e.target.value as string))[0]]:", categorias?.filter(ite => ite.id === +(e.target.value as string))[0])
                            setFormData({ ...formData, produtoSubcategoria: [...array, categorias?.filter(ite => ite.id === +(e.target.value as string))[0]] })
                        }
                    }
                }}
                options={categorias?.map((item) => ({ value: item.id.toString(), label: item.descricao_subcategoria })) || []}
            />
            <Button variant="contained" color="primary" onClick={() => {
                updateAddProduct(formData)
            }}>Aqui</Button>
        </Grid>
    );
};
export default ProductForm;
