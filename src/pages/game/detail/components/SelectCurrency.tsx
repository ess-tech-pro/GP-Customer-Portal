import {
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material'
import { useState } from 'react'

const SelectCurrency = () => {
	const [currency, setCurrency] = useState('10')

	const handleChange = (event: SelectChangeEvent) => {
		setCurrency(event.target.value as string)
	}

	return (
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <InputLabel sx={{
            fontWeight: 'bold',
            color: '#000',
          }}>Currency</InputLabel>
        </Grid>
        <Grid item xs>
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

export default SelectCurrency
