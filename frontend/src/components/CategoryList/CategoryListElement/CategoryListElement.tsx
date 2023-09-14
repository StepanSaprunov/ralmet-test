import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ICategory } from "../../../stores/categories/types";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  category: ICategory
}

const CategoryListElement = (props: IProps) => {
  const { category } = props;

  return (
    <Stack direction={"row"} width={"100%"} divider={<Divider orientation="vertical" flexItem />}>
      <Box width={"75px"}>
        <Typography variant="subtitle1" marginLeft={"20px"}>{category.id} </Typography>
      </Box>
      <Box width={"400px"}>
        <Typography variant="subtitle1" marginLeft={"20px"}>{category.name} </Typography>
      </Box>
      <Box flexGrow={1}>
        {category.subcategories?.map(subcat => <Typography key={subcat.id} variant="subtitle1" marginLeft={"5px"}>{` ${subcat.name} (${subcat.id});`}</Typography>)}
      </Box>
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Stack>
  )
}

export default CategoryListElement;