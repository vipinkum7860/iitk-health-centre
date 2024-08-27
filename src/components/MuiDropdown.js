import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox(props) {
  return (
    <Autocomplete
    className='combobox'
      disablePortal
      id="combo-box"
      options={props.options}
      sx={{ width: 300}}
      renderInput={(params) => <TextField {...params} onClick={props.onClick} onChange={props.onChange} label={props.placeholder} variant="standard"/>}
    />
  );
}
