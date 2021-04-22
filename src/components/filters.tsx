import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { MonetizationList} from '../data/filters'

export default function Filters(){
  const [activeMonetization, setActiveMonetization] = useState<Array<string>>([])
  const [priceRange, setPriceRange] = React.useState<Array<number>>([0, 7520000]);

  const handleMonetizationChange = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>) => {
    const newValues = event.target.value as Array<string>
    setActiveMonetization(newValues);
  };

  const handlePriceChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }
  
  
  return(
    <div className='filters__container'>
      <FormControl className='filters__monetization'>
        <InputLabel id="monetization-filter">Monetization</InputLabel>
        <Select
          labelId="monetization-filter"
          id="monetization-filter-chip"
          multiple
          value={activeMonetization}
          onChange={handleMonetizationChange}
          input={<Input id="select-multiple-monetization" />}
          renderValue={(selected) => (
            <div>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </div>
          )}
          style={{
            minWidth: 120
          }}
        >
          {MonetizationList.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className='filters__priceRange'>
        <Typography id="price-range-slider" gutterBottom>
          Price range
        </Typography>
        <Slider
          min={0}
          max={7520000}
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          style={{
            width: 240
          }}
        />
      </FormControl>
    </div>
  )
}