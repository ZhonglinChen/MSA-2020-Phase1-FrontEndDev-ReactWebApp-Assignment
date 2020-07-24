import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { IUserInput } from '../../../Common/Interface/Interfaces';

interface IRadioProps {
    SetOrderBy: (orderBy: string ) => void;

}
export default function OrderByRadio(props: IRadioProps) {
  const [value, setValue] = React.useState('popularity.desc');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    props.SetOrderBy((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset" >
      <FormLabel component="legend">Sort By</FormLabel>

      <RadioGroup aria-label="orderby" name="orderby" value={value} onChange={handleChange} row>
        <FormControlLabel value="popularity.desc" control={<Radio />} label="popularity.desc"  />
        <FormControlLabel value="release_date.desc" control={<Radio />} label="release_date.desc"    />
        <FormControlLabel value="revenue.desc" control={<Radio />} label="revenue.desc" />
        <FormControlLabel value="vote_average.desc"  control={<Radio />} label="vote_average.desc" />
        <FormControlLabel value="vote_count.desc"  control={<Radio />} label="vote_count.desc" />
      </RadioGroup>
    </FormControl>
  );
}