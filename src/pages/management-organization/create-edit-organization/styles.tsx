import { styled } from "styled-components";
import { styled as muiStyled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import ReactQuill from "react-quill";

export const ReactQuillStyled = styled(ReactQuill)({
  '.ql-container': {
    height: '150px'
  }
})

export const InputDisabledStyled = muiStyled('div')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  padding: '7px 14px',
  border: `1px solid ${theme.getCssVar('palette-grey-A200')}`,
  borderRadius: theme.getCssVar('shape-borderRadius'),
  userSelect: 'none'
}))
