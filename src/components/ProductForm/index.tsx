import { Chip, Container, Grid, Input, useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import ProductsCard from "components/ProductCard";
import { Product, ProductoColor, ProductoSize } from "store/api/product/product.interface";
import { useState, useEffect } from "react";
import { TextField, Text, Select, Button } from "ui-layout";
import { useGetSubCategoriasQuery } from "store/api/category";
import { useUpdateAddProductMutation } from "store/api/product";
import { useDropzone } from "react-dropzone";
import { useGetColorsQuery } from "store/api/color";
import { useGetSizesQuery } from "store/api/size";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const ProductForm: React.FC<React.PropsWithChildren<unknown>> = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<Partial<Product>>({})
    const [productoColors, setProductoColors] = useState<ProductoColor[]>([])
    const [productoColor, setProductoColor] = useState<Partial<ProductoColor>>({})
    const [productoSize, setProductoSize] = useState<Partial<ProductoSize>>({})
    const [file, setFile] = useState<File | undefined>(undefined)
    const [files, setFiles] = useState<File[]>([])

    const { data: categorias } = useGetSubCategoriasQuery()
    const { data: colors } = useGetColorsQuery()
    const { data: sizes } = useGetSizesQuery()
    const [updateAddProduct, { isSuccess }] = useUpdateAddProductMutation()

    const theme = useTheme();
    useEffect(() => {

        isSuccess && alert(isSuccess)
    }, [isSuccess]);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        multiple: true,

    })
    const { getRootProps: getRootPropsCapa, getInputProps: getInputPropsCapa, isDragActive: isDragActiveCapa, acceptedFiles: acceptedFilesCapa } =
        useDropzone({
            multiple: false,
        })
    useEffect(() => {
        setFiles(acceptedFiles)
    }, [acceptedFiles]);
    useEffect(() => {
        setFile(acceptedFilesCapa[0])
    }, [acceptedFilesCapa]);
    return (
        < Grid
            container
            direction="row"
            rowSpacing={2}
            columnSpacing={3}
            sx={{
                backgroundColor: theme.palette.background.default,
                height: "inherit",
                px: '50px',
                marginTop: '50px'
            }
            }
        >
            <Grid item xs={3} >
                <Grid item xs={12} sx={{
                    height: '200px',
                }}>
                    <Container
                        {...getRootPropsCapa()} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            flexWrap: 'wrap',
                            height: '100%',
                            border: `dashed ${isDragActiveCapa ? ` 5px ${theme.palette.secondary.main}` : theme.palette.primary.main}`,
                            borderRadius: 5,
                            transition: 'all ease 400ms',
                        }}>
                        {!!file && (
                            <Chip
                                label={file.name}
                                onDelete={() => setFile(undefined)}
                                
                            />
                        )}
                        <Input inputProps={{ ...getInputPropsCapa() }} />
                        <Text variant="body">{'Arraste o arquivo aqui'}</Text>
                    </Container>
                </Grid>
                <Grid item xs={12} sx={{
                    height: '200px',
                }}>
                    <Container
                        {...getRootProps()} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            flexWrap: 'wrap',
                            height: '100%',
                            border: `dashed ${isDragActive ? ` 5px ${theme.palette.secondary.main}` : theme.palette.primary.main}`,
                            borderRadius: 5,
                            transition: 'all ease 400ms',
                        }}>

                        {files?.map((file, index) => {
                            return <Chip
                                label={file.name}
                                onDelete={() => setFiles(files.filter((_, i) => i !== index))}
                                
                            />
                        })}
                        <Input inputProps={{ ...getInputProps() }} />
                        <Text variant="body">{t('dragFileHere')}</Text>
                    </Container>
                </Grid>
            </Grid>
            <Grid item container xs={9} alignContent={'flex-start'} rowSpacing={2} columnSpacing={2}>
                <Grid item xs={4} >

                    <TextField
                        label={t("name")}
                        onChange={(ev) => setFormData({ ...formData, nome: ev.target.value })}
                        value={formData.nome || ''}
                        required
                        
                    />
                </Grid>
                <Grid item xs={4} >

                    <TextField
                        label={t("quantity")}
                        type="number"
                        onChange={(ev) => setFormData({ ...formData, quantity: +ev.target.value })}
                        value={formData.quantity || ''}
                        required
                        
                    />
                </Grid>
                <Grid item xs={4} >

                    <TextField
                        label={t("description")}
                        onChange={(ev) => setFormData({ ...formData, descricao: ev.target.value })}
                        value={formData.descricao || ''}
                        required
                        
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label={t("value")}
                        type="number"
                        onChange={(ev) => setFormData({ ...formData, valor_produto: +ev.target.value })}
                        value={formData.valor_produto || ''}
                        required
                        
                    />
                </Grid>
                <Grid item xs={4} >
                    <Select
                        name={'categoryId'}
                        label={t("type")}
                        sx={{ backgroundColor: 'transparent' }}
                        type="multiple"
                        value={formData.produtoSubcategoria?.map(i => i.id?.toString()) || []}
                        onChange={(e) => {
                            const array = formData.produtoSubcategoria || []
                            const index = array.findIndex((ite) => ite.id === +(e.target.value as string));
                            if (categorias) {
                                if (index >= 0) {
                                    array?.splice(index, 1);
                                    setFormData({ ...formData, produtoSubcategoria: array })
                                } else {
                                    setFormData({ ...formData, produtoSubcategoria: [...array, categorias?.filter(ite => ite.id === +(e.target.value as string))[0]] })
                                }
                            }
                        }}
                        options={categorias?.map((item) => ({ value: item.id.toString(), label: item.descricao_subcategoria })) || []}
                    />
                </Grid>
                <Grid item container xs={12} rowSpacing={2}
                    columnSpacing={2}>
                    <Grid item xs={4} >
                        <Select
                            name={'categoryId'}
                            label={t("color")}
                            sx={{ backgroundColor: 'transparent' }}
                            
                            value={productoColor?.id?.toString() || ''}
                            onChange={(e) => {
                                setProductoColor({ ...productoColor, id: +(e.target.value as string) ,descricao:colors?.filter(s=>s.id===+(e.target.value as string))[0].descricao })
                            }}
                            options={colors?.map((item: any) => ({ value: item.id.toString(), label: item.descricao || '' })) || []}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <TextField
                            label={t("quantity")}
                            type="number"
                            onChange={(ev) => setProductoColor({ ...productoColor, quantidade: +(ev.target.value as string) })}
                            value={productoColor.quantidade || 0}
                            required
                            
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Button variant="secondary"  onClick={() => {
                            const cores = formData['cores'] || []
                            setFormData({ ...formData, cores: [...cores, productoColor] })
                            setProductoSize({})
                        }}> {t('add')}</Button>
                    </Grid>
                </Grid>
                <Grid item container xs={12} rowSpacing={2}
                    columnSpacing={2}>
                    <Grid item xs={4} >
                        <Select
                            name={'categoryId'}
                            label={t("size")}
                            sx={{ backgroundColor: 'transparent' }}
                            
                            value={productoSize?.id?.toString() || ''}
                            onChange={(e) => {
                                setProductoSize({ ...productoSize, id: +(e.target.value as string),descricao:sizes?.filter(s=>s.id===+(e.target.value as string))[0].descricao })
                            }}
                            options={sizes?.map((item: any) => ({ value: item.id.toString(), label: item.descricao || '' })) || []}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <TextField
                            label={t("quantity")}
                            type="number"
                            onChange={(ev) => setProductoSize({ ...productoSize, quantidade: +(ev.target.value as string) })}
                            value={productoSize.quantidade || 0}
                            required
                            
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Button variant="secondary"  onClick={() => {
                            const tamanhos = formData['tamanhos'] || []
                            setFormData({ ...formData, tamanhos: [...tamanhos, productoSize] })
                            setProductoSize({})
                        }}> {t("add")}</Button>
                    </Grid>
                </Grid>
                {formData.cores?.map(item => <><Text sx={{display:'contents'}} variant="h4" >{item.id}-{item.descricao}-{item.quantidade}</Text><br /></>)}
                {formData.tamanhos?.map(item => <><Text sx={{display:'contents'}} variant="h4" >{item.id}-{item.descricao}-{item.quantidade}</Text><br /></>)}
            </Grid>
            <Grid item xs={12} textAlign={'right'}>

                <Button variant="secondary"  onClick={() => {
                    updateAddProduct({ files: ([file] || []).concat(files) as any[], json: formData })
                }}>{t("save")}</Button>
            </Grid>
        </Grid >
    );
};
export default ProductForm;
