import { Box, Button, Divider, Stack } from "@mui/material";
import React from "react";

const CategoryListHeader = () => {
  return (
    <Stack direction={"row"} width={"100%"} divider={<Divider orientation="vertical" flexItem />}>
      <Box width={"75px"}>
        <Button variant="text">Id</Button>
      </Box>
      <Box width={"400px"}>
        <Button variant="text">Name</Button>
      </Box>
      <Box>
        <Button variant="text">Subcategories</Button>
      </Box>
    </Stack>
  )
}

export default React.memo(CategoryListHeader);