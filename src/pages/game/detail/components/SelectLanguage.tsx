import {
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material'
import { useState } from 'react'

const SelectLanguage = () => {
	const [language, setLanguage] = useState('10')

	const handleChange = (event: SelectChangeEvent) => {
		setLanguage(event.target.value as string)
	}

	return (
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <InputLabel sx={{
            fontWeight: 'bold',
            color: '#000',
          }}>Language</InputLabel>
        </Grid>
        <Grid item xs>
          <Select
            value={language}
            onChange={handleChange}
            fullWidth
            sx={{
              height: '36px',
            }}
          >
            <MenuItem value="10">English</MenuItem>
            <MenuItem value="20">VietNam</MenuItem>
          </Select>
        </Grid>
      </Grid>
	)
}

export default SelectLanguage
