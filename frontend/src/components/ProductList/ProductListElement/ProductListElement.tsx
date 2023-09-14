import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCategoryFX, openEditCategoryDialog } from "../../../stores/categories/categories";
import { IProduct } from "../../../stores/products/types";

interface IProps {
  product: IProduct
}

const ProductListElement = (props: IProps) => {
  const { product } = props;

  const handleDeleteClick = async () => {

  }

  const handleEditClick = () => {

  }

  return (
    <Stack direction={"row"} width={"100%"} divider={<Divider orientation="vertical" flexItem />}>
      <Box width={"75px"}>
        <Typography variant="subtitle1" marginLeft={"20px"}>{product.id} </Typography>
      </Box>
      <Box width={"300px"}>
        <Typography variant="subtitle1" marginLeft={"20px"}>{product.name} </Typography>
      </Box>
      <Box width={"300px"}>
        {product.categories?.map(category => <Typography key={category.id} variant="subtitle1" marginLeft={"5px"}>{category.name}</Typography>)}
      </Box>
      <Box width={"400px"}>
        <Stack direction={"column"} divider={<Divider orientation="horizontal" flexItem />}>
          {product.fields?.map(field =>
            <Stack
              direction={"row"}
              justifyContent={"space-evenly"}
              divider={<Divider orientation="vertical" flexItem key={field.name} />}
              key={field.name}
            >
              <Typography variant="subtitle1" margin={"5px"}>{field.name} </Typography>
              <Typography variant="subtitle1" margin={"5px"}>{field.value} </Typography>
            </Stack>
          )}
        </Stack>
      </Box>
      <Box flexGrow={1}>
        <Stack
          direction={"column"}
          spacing={1}
          padding={"10px"}
        >
          {product.files.map(file =>
            <a href={`${process.env.REACT_APP_BACKEND_URL}/${file.name}`} key={file.name}>{file.originalName}</a>
          )}
        </Stack>
      </Box>
      <IconButton onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  )
}

export default ProductListElement;