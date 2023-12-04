/* SPDX-FileCopyrightText: 2021 @koistya */
/* SPDX-License-Identifier: MIT */

import * as React from "react";
import { Typography, CssBaseline, Container } from "@mui/material";
import { Combobox } from "./Combobox";
import { AppToolbar, Toolbar } from "./AppToolbar";
import { ThemeProvider } from "./ThemeProvider";
import { HilabsAdvanceFilter } from "./hilabs-advance-filter";

/**
 * The top-level (root) React component.
 *
 * @see https://reactjs.org/
 * @see https://mui.com/core/
 */
export function App(): JSX.Element {

  const npiColumns = [
    {
      field: 'id',
      headerName: ' ',
      hide: true,
      filterable: false,
      disableClickEventBubbling: true,
    },
    {
      field: 'details',
      headerName: ' ',
      minWidth: 70,
      disableClickEventBubbling: true,
      filterable: false,
      sortable: false,
      pinnable: false,
    },
    {
      field: 'NPI_S',
      headerName: 'PROVIDERS (NPI)',
      minWidth: 120,
      disableClickEventBubbling: true,
      datatype: 'string',
    },
    {
      field: 'RELATED_NPI_S',
      headerName: 'Group Affiliation (Org NPI)',
      minWidth: 120,
      disableClickEventBubbling: true,
      datatype: 'string',
      hide: true,
      filterable: false,
    },
    {
      field: 'TIN_S',
      headerName: 'TIN',
      minWidth: 120,
      disableClickEventBubbling: true,
      datatype: 'string',
      hide: true,
      filterable: false,
    },
    {
      field: 'ORG_NAME_S',
      headerName: 'ORG NAME',
      minWidth: 420,
      flex: 3,
      disableClickEventBubbling: true,
      datatype: 'string',
    },
    {
      field: 'FIRST_NAME_S',
      headerName: 'FIRST NAME',
      minWidth: 150,
      flex: 1,
      hide: false,
      disableClickEventBubbling: true,
      datatype: 'string',
    },
    {
      field: 'MIDDLE_NAME_S',
      headerName: 'MIDDLE NAME',
      minWidth: 110,
      flex: 1,
      hide: false,
      disableClickEventBubbling: true,
      datatype: 'string',
    },
    {
      field: 'LAST_NAME_S',
      headerName: 'LAST NAME',
      minWidth: 150,
      flex: 1,
      hide: false,
      disableClickEventBubbling: true,
      datatype: 'string',
    },
    {
      field: 'TOTAL_INACCURATE_RECORDS_D',
      headerName: '#TOTAL ANOMALIES',
      flex: 1,
      minWidth: 120,
      disableClickEventBubbling: true,
      datatype: 'number',
      filterable: false,
      hide: false,
    },
    {
      field: 'FILTERED_RECORDS_D',
      headerName: '#FILTERED RECORDS',
      flex: 1,
      minWidth: 120,
      disableClickEventBubbling: true,
      hide: false,
      datatype: 'number',
      filterable: false,
    },
    {
      field: 'HEALTH_SCORE_D',
      headerName: 'HEALTH SCORE',
      flex: 1,
      minWidth: 100,
      disableClickEventBubbling: true,
      datatype: 'number',
    },
    {
      field: 'ADDRESS_ID_S',
      headerName: 'ADDRESS ID',
      minWidth: 150,
      filterable: true,
      hide: true,
    },
    {
      field: 'ADDRESS_S',
      headerName: 'ADDRESS',
      minWidth: 210,
      filterable: true,
      hide: true,
    },
    {
      field: 'CITY_S',
      advancefilterType: 'select',
      headerName: 'CITY',
      minWidth: 130,
      hide: true,
      filterable: true,
    },
    {
      field: 'STATE_S',
      headerName: 'STATE',
      hide: true,
      filterable: true,
    },
    {
      field: 'ZIP_S',
      advancefilterType: 'select',
      headerName: 'ZIP',
      hide: true,
      filterable: true,
    },
    {
      field: 'PHONE_S',
      headerName: 'PHONE',
      minWidth: 150,
      hide: true,
      filterable: true,
    },
    {
      field: 'SPECIALTY_S',
      headerName: 'SPECIALTY',
      minWidth: 270,
      hide: true,
      filterable: true,
    },
  
    {
      field: 'ANP_S',
      headerName: 'ANP',
      minWidth: 130,
      hide: true,
      filterable: true,
    },
    {
      field: 'SUGGESTION_TYPE_S',
      advancefilterType: 'select',
      headerName: 'SUGGESTION TYPE',
      minWidth: 150,
      filterable: true,
      hide: true,
      type: 'SELECT',
    },
    {
      field: 'MCHECK_RECOMMENDED_VALUE_S',
      headerName: 'SUGGESTED VALUE',
      minWidth: 420,
      filterable: true,
      hide: true,
    },
    {
      field: 'NOTES_S',
      headerName: 'AUDIT LOGS & NOTES',
      hide: true,
      minWidth: 500,
      filterable: true,
    },
    {
      field: 'MCHECK_R3_NET_SCORE_D',
      headerName: 'MCHECK R3 SCORE',
      hide: true,
      filterable: true,
      minWidth: 250,
      datatype: 'number',
    },
    {
      field: 'GOOGLE_R3_RECOMMENDATION_S',
      advancefilterType: 'select',
      headerName: 'GOOGLE R3 RECOMMENDATION',
      hide: true,
      filterable: true,
      minWidth: 250,
    },
    {
      field: 'GOOGLE_R3_SCORE_D',
      headerName: 'GOOGLE R3 SCORE',
      hide: true,
      filterable: true,
      minWidth: 100,
      datatype: 'number',
    },
    {
      field: 'HEALTHPLAN_RECOMMENDATION_S',
      advancefilterType: 'select',
      headerName: 'HEALTHPLAN RECOMMENDATION',
      hide: true,
      filterable: true,
      minWidth: 250,
    },
    {
      field: 'HEALTHPLAN_SCORE_D',
      headerName: 'HEALTHPLAN SCORE',
      hide: true,
      filterable: true,
      minWidth: 100,
    },
    {
      field: 'SOURCE1_MATCH_S',
      advancefilterType: 'select',
      headerName: 'SOURCE 1 MATCH',
      hide: true,
      filterable: true,
      minWidth: 100,
    },
    {
      field: 'SOURCE2_MATCH_S',
      advancefilterType: 'select',
      headerName: 'SOURCE 2 MATCH',
      hide: true,
      filterable: true,
      minWidth: 100,
    },
    {
      field: 'SOURCE3_MATCH_S',
      advancefilterType: 'select',
      headerName: 'SOURCE 3 MATCH',
      hide: true,
      filterable: true,
      minWidth: 100,
    },
    {
      field: 'SOURCE4_MATCH_S',
      advancefilterType: 'select',
      headerName: 'SOURCE 4 MATCH',
      hide: true,
      filterable: true,
      minWidth: 100,
    },
    {
      field: 'SOURCE5_MATCH_S',
      advancefilterType: 'select',
      headerName: 'SOURCE 5 MATCH',
      hide: true,
      filterable: true,
      minWidth: 100,
    },
    {
      field: 'SOURCE6_MATCH_S',
      headerName: 'SOURCE 6 MATCH',
      hide: true,
      filterable: false,
      minWidth: 100,
    },
    {
      field: 'SOURCE7_MATCH_S',
      headerName: 'SOURCE 7 MATCH',
      hide: true,
      filterable: false,
      minWidth: 100,
    },
    {
      field: 'SOURCE8_MATCH_S',
      headerName: 'SOURCE 8 MATCH',
      hide: true,
      filterable: false,
      minWidth: 100,
    },
  ]

  const cols = npiColumns.map(e => ({"id": e.field, "value": e.headerName}))

  return (
    <ThemeProvider>
      <Container sx={{ my: 4 }}>
        <Typography sx={{ mb: 2 }} variant="body2">
          Material UI Autocomplete playground 😁 See{" "}
          <b>
            <code>./components/Combobox.tsx</code>
          </b>
          <HilabsAdvanceFilter 
          conditions={[]}  columnOptions={cols} onSaveFilter={()=>{}} onClear={()=>{}} onSubmit={()=>{}}/>
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
