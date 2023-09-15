import React from "react";

import { IconButton, Stack } from "@mui/material";
import { IField } from "../../stores/products/types";
import Field from "./Field/Field";
import AddIcon from '@mui/icons-material/Add';


interface IProps {
  fields: IField[];
  onFieldAdd: () => void;
  onFieldDelete: (field: IField) => void;
  onFieldChange: (newValue: IField) => void;
}

const Fields = (props: IProps) => {
  const { fields, onFieldAdd, onFieldChange, onFieldDelete } = props;

  return (
    <Stack direction={"column"} spacing={1}>
      {fields.map(field =>
        <Field
          field={field}
          onFieldChange={onFieldChange}
          onFieldDelete={onFieldDelete}
          key={field.id}
        ></Field>)}
      <IconButton onClick={onFieldAdd} size="small">
        <AddIcon />
      </IconButton>
    </Stack>
  )
}

export default Fields;