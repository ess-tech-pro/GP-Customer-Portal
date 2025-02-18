import { CloudUpload } from "@mui/icons-material";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles'
import type { Theme } from "@mui/material/styles";


export const FileUploadStyled = styled(Box)(({ theme }: { theme: Theme }) => ({
  position: "relative",
  border: "2px dashed gray",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "#f5f5f5",
  width: '100%',
  'aspectRatio': '11/3',

  '&.--is-error': {
    borderColor: theme.getCssVar('palette-error-main')
  },

  [theme.breakpoints.down('sm')]: {
    '&:has(img)': {
      border: 'none'
    }
  },

  [theme.breakpoints.up('sm')]: {
    width: "150px",
    height: '150px',
    'aspectRatio': 'unset'
  }
})) // FileUploadStyled

export const UploadIconStyled = styled(CloudUpload)({
  fontSize: "50px",
  color: "gray",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}) // UploadIconStyled

export const PreviewLogoStyled = styled('img')(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  'aspectRatio': 'unset',
  height: "100%",
  objectFit: 'cover',

  [theme.breakpoints.up('sm')]: {
    'aspectRatio': '11/3',
    height: 'auto'
  }
}))
