
import React, { useCallback, useEffect, useState } from "react";
import { $allCategories, $editCategoryDialog, closeEditCategoryDialog, editCategoryFX, fetchAllCategoriesFX } from "../../stores/categories/categories";
import { Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { useStore } from "effector-react";
import CategoryAutocomplete from "../CategoryAutocomplete/CategoryAutocomplete";

interface IAutocompleteValue {
  id: number;
  label: string;
}

const EditCategoryDialog = () => {
  const { category, isOpen: open } = useStore($editCategoryDialog);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setSubcategories(category.subcategories?.map(el => {
        return {
          id: el.id,
          label: el.name
        }
      }
      ) ?? []);
    }
  }, [category])

  const [nameIsValid, setNameIsValid] = useState(false);

  const subcategoriesOption = useStore($allCategories)
    .map(el => { return { id: el.id, label: el.name } })
    .filter(el => el.id !== category?.id);

  useEffect(() => {
    fetchAllCategoriesFX();
  }, []);

  const [name, setName] = useState("");

  useEffect(() => {
    setNameIsValid(name !== "" && !subcategoriesOption.some(el => el.label === name));
  }, [name]);

  const [subcategories, setSubcategories] = useState<IAutocompleteValue[]>([]);

  const [sCategoryValue, setSCategoryValue] = useState<IAutocompleteValue | null>(null);

  useEffect(() => {
    if (sCategoryValue) {
      setSubcategories(prev => {
        if (!prev.some(el => el.id === sCategoryValue.id)) {
          return [...prev, sCategoryValue]
        }
        return prev;
      });
      setSCategoryValue(null);
    }
  }, [sCategoryValue])

  const handleClose = useCallback(() => {
    closeEditCategoryDialog();
  }, []);

  const handleSaveButtonClick = async () => {
    if (nameIsValid) {
      await editCategoryFX({
        id: category?.id ?? 0,
        name,
        subcategories: subcategories.map(el => el.id)
      });
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle>Edit category</DialogTitle>
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
          <Button variant="contained" onClick={handleSaveButtonClick} disabled={!nameIsValid}>Save</Button>
        </Stack>
      </Stack>

    </Dialog>
  );
}

export default EditCategoryDialog;