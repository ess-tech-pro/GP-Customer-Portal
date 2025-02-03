import {
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';

import React from 'react';
import { useTranslation } from 'react-i18next';

// Predefined languages
const LANGUAGES = [
  { code: 'en', name: 'English', icon: '🇺🇸' },
  { code: 'vi', name: 'Vietnamese', icon: '🇻🇳' },
];

const SelectLanguage: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const newLanguage = event.target.value as string;
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      MenuProps={{
        PaperProps: {
          sx: {
            marginTop: '2px',
            backgroundColor: 'black', // Thêm dòng này
          },
        },
      }}
      sx={{
        color: 'white',

        '& .MuiSelect-icon': {
          color: 'white',
        },
      }}
    >
      {LANGUAGES.map((language) => (
        <MenuItem key={language.code} value={language.code}>
          {language.icon}
          <span className="text-white" style={{ marginLeft: 5 }}>
            {language.name}
          </span>
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectLanguage;
