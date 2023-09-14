import React, { useEffect, useState } from "react";
import { $allCategories, fetchAllCategoriesFX } from "../../stores/categories/categories";
import { useStore } from "effector-react";
import { ICategoriesAutocompleteValue } from "../../stores/categories/types";
import { Autocomplete, IconButton, Stack, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  setCategories: (callback: (prev: ICategoriesAutocompleteValue[]) => ICategoriesAutocompleteValue[]) => void;
  categories: ICategoriesAutocompleteValue[] | null;
}

const CategoryAutocomplete = (props: IProps) => {
  const { setCategories, categories } = props;

  const categoriesOption = useStore($allCategories).map(el => { return { id: el.id, label: el.name } });

  const [sCategoryValue, setSCategoryValue] = useState<ICategoriesAutocompleteValue | null>(null);

  useEffect(() => {
    if (sCategoryValue) {
      setCategories(prev => {
        if (!prev.some(el => el.id === sCategoryValue.id)) {
          return [...prev, sCategoryValue]
        }
        return prev;
      });
      setSCategoryValue(null);
    }
  }, [sCategoryValue])

  useEffect(() => {
    fetchAllCategoriesFX();
  }, []);

  return (
    <>
      {categories?.map(el =>
        <Stack direction={"row"} key={el.id}>
          <TextField
            label="Subcategory"
            value={el.label}
            disabled
          />
          <IconButton onClick={() => {
            setCategories(prev => prev.filter(prevEl => prevEl.id !== el.id))
          }}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}
      <Stack direction={"row"}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={categoriesOption}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Category" />
          }
          value={sCategoryValue}
          onInputChange={(_, newInputValue) => {
            setSCategoryValue(categoriesOption.find((el) => el.label === newInputValue) ?? null);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      </Stack>
    </>
  )
}

export default CategoryAutocomplete;