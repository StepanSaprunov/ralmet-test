import React, { useCallback, useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import { ICategoriesAutocompleteValue } from "../../stores/categories/types";
import CategoryAutocomplete from "../CategoryAutocomplete/CategoryAutocomplete";
import { $editProductDialog, closeEditProductDialog, editProductFX } from "../../stores/products/products";
import { IField, IFile } from "../../stores/products/types";
import Fields from "../Fields/Fields";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchAllCategoriesFX } from "../../stores/categories/categories";
import { useStore } from "effector-react";


const EditProductDialog = () => {
  const { isOpen: open, product } = useStore($editProductDialog);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategories(product.categories.map(
        category => ({ id: category.id, label: category.name })
      ));
      setField(product.fields);
      setExistedFiles(product.files);
      setFilesToRemove([]);
    }
  }, [product])

  const [name, setName] = useState("");
  const [categories, setCategories] = useState<ICategoriesAutocompleteValue[]>([]);
  const [fields, setField] = useState<IField[]>([]);
  const [existedFiles, setExistedFiles] = useState<IFile[]>([]);
  const [files, setFiles] = useState<FileList | null>();
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [filesToRemove, setFilesToRemove] = useState<IFile[]>([])

  useEffect(() => {
    fetchAllCategoriesFX();
  }, []);

  useEffect(() => {
    const fNames = [];
    if (files) {
      for (const file of files) {
        fNames.push(file.name);
      }
    }
    setFileNames(fNames);
  }, [files])



  const onFieldAdd = () => {
    setField(prev => [...prev, {
      name: "",
      value: "",
      id: Date.now()
    }]);
  };

  const onFieldChange = (field: IField) => {
    setField(prev => prev.map(el => {
      if (el.id !== field.id) {
        return el;
      }
      return field;
    }))
  };

  const onFieldDelete = (field: IField) => {
    setField(prev => prev.filter(el => el.id !== field.id));
  };

  const handleClose = useCallback(() => {
    closeEditProductDialog()
  }, []);

  const handleAddButtonClick = async () => {
    const f = [];
    if (files) {
      for (const file of files) {
        f.push(file);
      }
    }

    await editProductFX({
      name,
      categories: categories.map(cat => cat.id),
      fields: fields.map(field => ({ name: field.name, value: field.value })),
      files: f,
      id: product!.id,
      filesToRemove
    });
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <DialogTitle>Edit product</DialogTitle>
      <Stack spacing={2} direction={"row"} padding={"20px"}>
        <Stack spacing={2} direction={"column"}>
          <TextField
            required
            label="Name"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
          <Typography variant="subtitle1">Fields</Typography>
          <Fields
            fields={fields}
            onFieldAdd={onFieldAdd}
            onFieldChange={onFieldChange}
            onFieldDelete={onFieldDelete}
          />
        </Stack>
        <Stack spacing={2} direction={"column"}>
          <CategoryAutocomplete
            categories={categories}
            setCategories={setCategories}
          />
        </Stack>
        <Stack spacing={2} direction={"column"}>
          {existedFiles.map(eFile =>
            <Stack direction={"row"} spacing={1} key={eFile.name} alignItems={"center"}>
              <Typography variant="subtitle1">{eFile.originalName}</Typography>
              <IconButton onClick={() => {
                setExistedFiles(prev => prev.filter(prevEl => prevEl.name !== eFile.name))
                setFilesToRemove(prev => [...prev, eFile]);
              }}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          )}
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
            sx={{ marginRight: "1rem" }}
          >
            Upload files
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
          </Button>
          {fileNames.map((fName, index) => <Typography variant="subtitle1" key={index}>{fName}</Typography>)}
        </Stack>
      </Stack>
      <Stack direction={"row"} justifyContent={"center"} spacing={2} padding={"20px"}>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAddButtonClick}>Save</Button>
      </Stack>
    </Dialog >
  );
}

export default EditProductDialog;