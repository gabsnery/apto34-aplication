import { Chip, Container, Grid, Input, useTheme } from "@mui/material";
//import { Link } from 'react-router-dom'

import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/store";
import ProductsCard from "components/ProductCard";
import { Product } from "store/api/product/product.interface";
import { useState, useEffect } from "react";
import { TextField, Text, Select, Button } from "ui-layout";
import { useGetCategoriasQuery } from "store/api/category";
import { useUpdateAddProductMutation } from "store/api/product";
import { useDropzone } from "react-dropzone";
// import ReCAPTCHA from 'react-google-recaptcha'
// import { add, isAfter } from 'date-fns'
const ProductForm: React.FC<React.PropsWithChildren<unknown>> = () => {
    const { t } = useTranslation(["login", "common"]);
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<Partial<Product>>({})
    const [file, setFile] = useState<File | undefined>(undefined)
    const [files, setFiles] = useState<File[]>([])

    const { data: categorias } = useGetCategoriasQuery()
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
                                color="primary"
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
                                color="primary"
                            />
                        })}
                        <Input inputProps={{ ...getInputProps() }} />
                        <Text variant="body">{'Arraste o arquivo aqui'}</Text>
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
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4} >

                    <TextField
                        label={t("descricao")}
                        onChange={(ev) => setFormData({ ...formData, descricao: ev.target.value })}
                        value={formData.descricao || ''}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4} >
                    <TextField
                        label={t("value")}
                        type="number"
                        onChange={(ev) => setFormData({ ...formData, valor_produto: +ev.target.value })}
                        value={formData.valor_produto || ''}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4} >
                    <Select
                        name={'categoryId'}
                        label="Tipo"
                        sx={{ backgroundColor: 'transparent' }}
                        fullWidth
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
            </Grid>
            <Grid item xs={12} textAlign={'right'}>

                <Button variant="contained" color="primary" onClick={() => {
                    updateAddProduct({ files: ([file] || []).concat(files) as any[], json: formData })
                }}>SALVAR</Button>
            </Grid>
        </Grid >
    );
};
export default ProductForm;
