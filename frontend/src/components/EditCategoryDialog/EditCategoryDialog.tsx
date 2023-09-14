import React, { useCallback, useEffect, useState } from "react";
import { $allCategories, closeEditCategoryDialog, editCategoryFX, fetchAllCategoriesFX } from "../../stores/categories/categories";
import { Autocomplete, Button, Dialog, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useStore } from "effector-react";
import { ICategory } from "../../stores/categories/types";

interface IProps {
  open: boolean;
  category: ICategory | null;
}

interface IAutocompleteValue {
  id: number;
  label: string;
}

const EditCategoryDialog = (props: IProps) => {
  const { open, category } = props;

  const [nameIsValid, setNameIsValid] = useState(false);

  const subcategoriesOption = useStore($allCategories)
    .map(el => { return { id: el.id, label: el.name } })
    .filter(el => el.id !== category?.id);

  useEffect(() => {
    fetchAllCategoriesFX();
  }, []);

  const [name, setName] = useState(category?.name ?? "");

  useEffect(() => {
    setNameIsValid(name !== "" && !subcategoriesOption.some(el => el.label === name));
  }, [name]);

  const [subcategories, setSubcategories] = useState<IAutocompleteValue[]>(
    category?.subcategories?.map(el => {
      return {
        id: el.id,
        label: el.name
      }
    }
    ) ?? []
  );

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
      <DialogTitle>Add category</DialogTitle>
      <Stack spacing={2} direction={"column"} padding={"20px"}>
        <TextField
          required
          id="name-required"
          label="Name"
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
        {subcategories.map(el =>
          <Stack direction={"row"} key={el.id}>
            <TextField
              label="Subcategory"
              value={el.label}
              disabled
            />
            <IconButton onClick={() => {
              setSubcategories(prev => prev.filter(prevEl => prevEl.id !== el.id))
            }}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        )}
        <Stack direction={"row"}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={subcategoriesOption}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Subcategory" />
            }
            value={sCategoryValue}
            onInputChange={(_, newInputValue) => {
              setSCategoryValue(subcategoriesOption.find((el) => el.label === newInputValue) ?? null);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} spacing={2}>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveButtonClick} disabled={!nameIsValid}>Save</Button>
        </Stack>
      </Stack>

    </Dialog>
  );
}

export default React.memo(EditCategoryDialog);