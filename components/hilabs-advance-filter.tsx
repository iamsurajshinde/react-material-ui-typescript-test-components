import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Select,
} from "@mui/material";
import {
  HilabsAdvanceFilterColumnOptionsProps,
  HilabsAdvanceFilterProps,
} from "./types";
import React, { useEffect, useState } from "react";

const CONDITION_OPTIONS = [
  {
    id: 'condition_1',
    name: 'Equal to',
    value: '=',
    type:'string,number,date',
  },
  {
    id: 'condition_2',
    name: 'Not equal to',
    value: '!=',
    type: 'string,number,date',
  },
  {
    id: 'condition_5',
    name: 'Greater than',
    value: '>=',
    type: 'number,date',
  },
  {
    id: 'condition_6',
    name: 'Lesser than',
    value: '<=',
    type: 'number,date',
  },
  { id: 'condition_7', name: 'In', value: 'IN', type: 'string' },

  {
    id: 'condition_8',
    name: 'Not In',
    value: 'NOT IN',
    type: 'string',
  },
  {
    id: 'condition_9',
    name: 'Like',
    value: 'LIKE',
    type: 'string',
  },
]


export function HilabsAdvanceFilter({
  addNewCondition = "Add new condition",
  cancelButtonText = "Cancel",
  saveFilterButtonText = "Save Filter",
  applyFilterButtonText = "Apply Filter",
  cancelButtonVariant = "text",
  saveFilterButtonVariant = "text",
  applyFilterButtonVariant = "contained",
  conditionOptions = [],
  conditions,
  columnOptions = [],
  onSaveFilter,
  onClear,
  onSubmit,
}: HilabsAdvanceFilterProps) {

  const [columnOptionsMap, setColumnOptionsMap] = useState({});
  const [conditionOptionsState, setConditionOptionsState] = useState<Array<any>>([]);
  
  const [selectedColumn, setSelectedColumn] =
    useState<HilabsAdvanceFilterColumnOptionsProps>({id: '', value: ''});
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCondition, setSelectedCondition] = useState({id: 'condition_1'});

  useEffect(() => {
    if (conditionOptions?.length) {
      setConditionOptionsState(conditionOptions);
    } else {
      setConditionOptionsState(CONDITION_OPTIONS);
    }
  }, [conditionOptions?.length]);


  useEffect(() => {
    if (columnOptions?.length) {
      const colMap = columnOptions.map(item => ({ [item.id]: item }))
      setColumnOptionsMap(colMap)
      setSelectedColumn(columnOptions[0]);
    }
  }, [columnOptions?.length]);

  const handleChange = (e: any) => {
    if (e.target.id === 'advance-filter__column-options') {
      setSelectedColumn(columnOptionsMap[e.target.value])
    }
    if (e.target.id === 'advance-filter__value') {
      setSelectedValue(e.target.value);
    }
    console.log("handleChange", e.target.value)
  };

  const handleConditionClick = (condition) => {
    setSelectedCondition(condition)
  }

  const handleAddNewConditionAction = (e: any) => {
    e.preventDefault();
  };

  return (
    <Box
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
          <ButtonGroup
            variant={'outlined'}
            size="small"
            color="primary"
            aria-label="primary button group"
          >
            {conditionOptionsState.map(button => {
              return <Button variant={button.id === selectedCondition.id ? "contained" : "outlined" } onClick={() => handleConditionClick(button)}>{button.name}</Button>
            })}
            
            
          </ButtonGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={2}>Value</Grid>
        <Grid item xs={10}>
          {selectedColumn?.type === "select" && (
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
        </Grid>
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
      <Box className="advance-filter__footer" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
