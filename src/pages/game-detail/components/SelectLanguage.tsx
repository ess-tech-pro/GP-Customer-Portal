import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { memo, useState } from 'react'
import Grid from '@mui/material/Grid2';

const SelectLanguage = () => {
  const [language, setLanguage] = useState('10')

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string)
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
        }}>Language</InputLabel>
      </Grid>
      <Grid size={{
        xs: 8,
        md: 7,
      }}>
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

export default memo(SelectLanguage)
