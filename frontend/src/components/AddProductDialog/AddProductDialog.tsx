import React, { useCallback, useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { ICategoriesAutocompleteValue } from "../../stores/categories/types";
import CategoryAutocomplete from "../CategoryAutocomplete/CategoryAutocomplete";
import { closeAddProductDialog, createProductFX } from "../../stores/products/products";
import { IField } from "../../stores/products/types";
import Fields from "../Fields/Fields";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface IProps {
  open: boolean;
}

const AddProductDialog = (props: IProps) => {
  const { open } = props;

  const [name, setName] = useState("");
  const [categories, setCategories] = useState<ICategoriesAutocompleteValue[]>([]);
  const [fields, setField] = useState<IField[]>([]);
  const [files, setFiles] = useState<FileList | null>();
  const [filesArray, setFilesArray] = useState<string[]>([]);

  useEffect(() => {
    const fNames = [];
    if (files) {
      for (const file of files) {
        fNames.push(file.name);
      }
    }
    setFilesArray(fNames);
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
    closeAddProductDialog()
  }, []);

  const handleAddButtonClick = async () => {
    const f = [];
    if (files) {
      for (const file of files) {
        f.push(file);
      }
    }

    await createProductFX({
      name,
      categories: categories.map(cat => cat.id),
      fields: fields.map(field => ({ name: field.name, value: field.value })),
      files: f,
    });
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <DialogTitle>Add product</DialogTitle>
      <Stack spacing={2} direction={"row"} padding={"20px"}>
        <Stack spacing={2} direction={"column"}>
          <TextField
            required
            id="name-required"
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
          {filesArray.map(fName => <Typography variant="subtitle1">{fName}</Typography>)}
        </Stack>
      </Stack>
      <Stack direction={"row"} justifyContent={"center"} spacing={2} padding={"20px"}>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAddButtonClick}>Add</Button>
      </Stack>
    </Dialog>
  );
}

export default React.memo(AddProductDialog);