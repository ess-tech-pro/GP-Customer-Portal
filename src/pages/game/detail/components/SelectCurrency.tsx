import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { memo, useState } from 'react'
import Grid from '@mui/material/Grid2';

const SelectCurrency = () => {
  const [currency, setCurrency] = useState('10')

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string)
  }

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid size={{
        xs: 4,
        md: 5,
      }}>
        <InputLabel sx={{
          fontWeight: 'bold',
          color: '#000',
        }}>Currency</InputLabel>
      </Grid>
      <Grid size={{
        xs: 8,
        md: 7,
      }}>
        <Select
          value={currency}
          onChange={handleChange}
          fullWidth
          sx={{
            height: '36px',
          }}
        >
          <MenuItem value='10'>USD</MenuItem>
          <MenuItem value='20'>VND</MenuItem>
        </Select>
      </Grid>
    </Grid>
  )
}

export default memo(SelectCurrency)
