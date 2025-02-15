// MUI Imports
import type { Theme } from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const autocomplete = (): Theme['components'] => ({
  MuiAutocomplete: {
    defaultProps: {
      slotProps: {
        paper: {
          variant: 'outlined'
        }
      },
      ChipProps: {
        size: 'small'
      },
      popupIcon: <KeyboardArrowDownIcon />
    },
    styleOverrides: {
      root: {
        '& .MuiButtonBase-root.Mui-disabled i, & .MuiButtonBase-root.Mui-disabled svg': {
          color: 'var(--mui-palette-action-disabled)'
        },
        '& .MuiOutlinedInput-input': {
          height: '1.4375em'
        }
      },
      input: {
        '& + .MuiAutocomplete-endAdornment': {
          right: '1rem',
          '& i, & svg': {
            fontSize: '1.25rem',
            color: 'var(--mui-palette-text-primary)'
          },
          '& .MuiAutocomplete-clearIndicator': {
            padding: 2
          }
        },
        '&.MuiInputBase-inputSizeSmall + .MuiAutocomplete-endAdornment': {
          '& i, & svg': {
            fontSize: '1rem'
          }
        }
      },
      paper: {
        boxShadow: 'var(--mui-customShadows-lg)',
        marginBlockStart: '0.125rem'
      },
      listbox: ({ theme }) => ({
        '& .MuiAutocomplete-option': {
          paddingBlock: theme.spacing(2),
          marginInline: theme.spacing(2),
          marginBlock: theme.spacing(0.5),
          borderRadius: 'var(--mui-shape-borderRadius)',
          '&[aria-selected="true"]': {
            backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
            color: 'var(--mui-palette-primary-main)',
            '&.Mui-focused, &.Mui-focusVisible': {
              backgroundColor: 'var(--mui-palette-primary-mainOpacity)'
            }
          }
        },
        '& .MuiAutocomplete-option.Mui-focusVisible': {
          backgroundColor: 'var(--mui-palette-action-hover)'
        }
      })
    }
  }
})

export default autocomplete
