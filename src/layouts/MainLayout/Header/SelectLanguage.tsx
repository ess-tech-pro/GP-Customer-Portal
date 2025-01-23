import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';

import React from 'react';
import { useTranslation } from 'react-i18next';

// Predefined languages
const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'vi', name: 'Vietnamese' },
];

const SelectLanguage: React.FC = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (event: SelectChangeEvent) => {
        const newLanguage = event.target.value as string;
        i18n.changeLanguage(newLanguage);
    };

    return (
        <FormControl variant="outlined" size="small">
            <InputLabel>Language</InputLabel>
            <Select
                value={i18n.language}
                label="Language"
                onChange={handleLanguageChange}
            >
                {LANGUAGES.map((language) => (
                    <MenuItem key={language.code} value={language.code}>
                        <span className="text-white">
                            {language.name}
                        </span>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectLanguage;