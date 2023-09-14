import React, { useEffect, useState } from "react";
import { IconButton, Stack, TextField } from "@mui/material";
import { IField } from "../../../stores/products/types";
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  field: IField;
  onFieldChange: (newValue: IField) => void;
  onFieldDelete: (field: IField) => void;
}

const Field = (props: IProps) => {
  const { field, onFieldChange, onFieldDelete } = props;

  const [name, setName] = useState(field.name);
  const [value, setValue] = useState(field.value);

  useEffect(() => {
    if (name !== field.name || value !== field.value) {
      onFieldChange({
        id: field.id,
        name: name,
        value: value
      });
    }
  }, [name, value]);

  return (
    <Stack direction={"row"} spacing={1}>
      <TextField
        required
        label="Name"
        value={name}
        onChange={(e) => { setName(e.target.value) }}
      />
      <TextField
        label="Value"
        value={value}
        onChange={(e) => { setValue(e.target.value) }}
      />
      <IconButton onClick={() => {
        onFieldDelete(field);
      }}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}

export default Field;