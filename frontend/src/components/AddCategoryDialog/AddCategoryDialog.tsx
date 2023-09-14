import React, { useCallback, useEffect, useState } from "react";
import { $allCategories, closeAddCategoryDialog, createCategoryFX, fetchAllCategoriesFX } from "../../stores/categories/categories";
import { Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { useStore } from "effector-react";
import CategoryAutocomplete from "../CategoryAutocomplete/CategoryAutocomplete";

interface IProps {
  open: boolean;
}

interface IAutocompleteValue {
  id: number;
  label: string;
}

const AddCategoryDialog = (props: IProps) => {
  const { open } = props;

  const [nameIsValid, setNameIsValid] = useState(false);

  const subcategoriesOption = useStore($allCategories).map(el => { return { id: el.id, label: el.name } });

  useEffect(() => {
    fetchAllCategoriesFX();
  }, []);

  const [name, setName] = useState("");

  useEffect(() => {
    setNameIsValid(name !== "" && !subcategoriesOption.some(el => el.label === name));
  }, [name]);

  const [subcategories, setSubcategories] = useState<IAutocompleteValue[]>([]);

  const handleClose = useCallback(() => {
    closeAddCategoryDialog();
  }, []);

  const handleAddButtonClick = async () => {
    if (nameIsValid) {
      await createCategoryFX({
        name,
        subcategories: subcategories.map(el => el.id)
      });
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle>Add category</DialogTitle>
      <Stack spacing={2} direction={"column"} padding={"20px"}>
        <TextField
          required
          id="name-required"
          label="Name"
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
        <CategoryAutocomplete
          categories={subcategories}
          setCategories={setSubcategories}
        />
        <Stack direction={"row"} justifyContent={"center"} spacing={2}>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddButtonClick} disabled={!nameIsValid}>Add</Button>
        </Stack>
      </Stack>

    </Dialog>
  );
}

export default React.memo(AddCategoryDialog);