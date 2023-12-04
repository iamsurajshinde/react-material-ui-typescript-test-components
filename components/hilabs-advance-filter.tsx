import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import {
  HilabsAdvanceFilterColumnOptionsProps,
  HilabsAdvanceFilterProps,
} from "./types";
import React, { useEffect, useState } from "react";

export function HilabsAdvanceFilter({
  addNewCondition = "Add new condition",
  cancelButtonText = "Cancel",
  saveFilterButtonText = "Save Filter",
  applyFilterButtonText = "Apply Filter",
  cancelButtonVariant = "text",
  saveFilterButtonVariant = "text",
  applyFilterButtonVariant = "contained",
  conditions,
  columnOptions = [],
  onSaveFilter,
  onClear,
  onSubmit,
}: HilabsAdvanceFilterProps) {
  const [selectedColumn, setSelectedColumn] =
    useState<HilabsAdvanceFilterColumnOptionsProps>({ id: "", value: "" });

  const [columnOptionsMap, setColumnOptionsMap] = useState({});
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (columnOptions?.length) {
      const colMap = columnOptions.map(item => ({[item.id] : item}))
      setColumnOptionsMap(colMap)
      setSelectedColumn(columnOptions[0]);
    }
  }, [columnOptions?.length]);

  const handleChange = (e: any) => {
    if(e.target.id === 'advance-filter__value') {
      setSelectedColumn(columnOptionsMap[e.target.value])
    }
    setSelectedValue(e.target.value);
    console.log("handleChange" , e.target.value)
  };

  const handleAddNewConditionAction = (e: any) => {
    e.preventDefault();
  };

  return (
    <Box
      noValidate
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}
    >
      <Grid container xs={12}>
        <Grid item xs={2}>
            If Column
        </Grid>
        <Grid item xs={10}>
          <Select
            labelId="advance-filter__column-options-label"
            id="advance-filter__column-options"
            value={selectedColumn?.id}
            onChange={handleChange}
          >
            {columnOptions.map((item) => (
              <MenuItem value={item.id}>{item.value}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <FormLabel>Condition</FormLabel>
          <RadioGroup defaultValue="equalTo" name="radio-buttons-group">
            <FormControlLabel
              value="equalTo"
              control={<Radio />}
              label="Equal to"
            />
            <FormControlLabel
              value="notEqualTo"
              control={<Radio />}
              label="Not equal to"
            />
            <FormControlLabel
              value="greaterThan"
              control={<Radio />}
              label="Greater than"
            />
            <FormControlLabel
              value="lessThan"
              control={<Radio />}
              label="Less than"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <InputLabel htmlFor="advance-filter__value-label">Value</InputLabel>
          {selectedColumn.type === "select" && (
            <Select
              labelId="advance-filter__value-label"
              id="advance-filter__value"
              value={selectedValue}
              onChange={handleChange}
            >
              {selectedColumn?.selectOptions?.map((item) => (
                <MenuItem value={item.id}>{item.value}</MenuItem>
              ))}
            </Select>
          )}
          {(!selectedColumn.type || selectedColumn.type === "text") && (
            <Input
              id="advance-filter__value"
              value={selectedValue}
              onChange={handleChange}
            />
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={conditions.length >= 5}
          onClick={handleAddNewConditionAction}
        >
          + {addNewCondition}
        </Button>
      </Grid>
      <Divider />
      <Box className="advance-filter__footer"  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box>
          <Button
            variant={saveFilterButtonVariant}
            onClick={() => onSaveFilter()}
          >
            {saveFilterButtonText}
          </Button>
        </Box>
        <Box>
          <Button variant={cancelButtonVariant} onClick={() => onClear()}>
            {cancelButtonText}
          </Button>
          <Button variant={applyFilterButtonVariant} type="submit">
            {applyFilterButtonText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
