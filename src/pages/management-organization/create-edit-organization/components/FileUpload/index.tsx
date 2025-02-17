import { useState } from "react";
import { Box, Grid2, Typography, useMediaQuery, useTheme } from "@mui/material";
import { InfoRounded } from "@mui/icons-material";
import { toast } from 'react-toastify';
import { ControllerRenderProps, FieldErrors, UseFormGetValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FileUploadStyled, PreviewLogoStyled, UploadIconStyled } from "./styles";

const FileUploader = ({ field: { onChange, ...field }, errors, getValues }: {
  field: ControllerRenderProps<{
    logo?: unknown;
  }, "logo">
  errors: FieldErrors<{
    logo?: any;
  }>
  getValues: UseFormGetValues<{
    logo?: any;
  }>
}) => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const fileInput = useRef<HTMLInputElement>()
  const theme = useTheme()
  const isSmallScreenUp = useMediaQuery(theme.breakpoints.up('sm'))

  const handleFileChange = (event) => {
    onChange(event.target.files[0])
    const selectedFile = getValues('logo')
    if (selectedFile && ["image/jpeg", "image/png"].includes(selectedFile.type)) {
      setFile(URL.createObjectURL(selectedFile))
    } else {
      setFile(null);
      toast.error("Only JPG and PNG files are allowed.")
    }
  }; // handleFileChange

  const handleDrop = (event) => {
    event.preventDefault();
    onChange(event.dataTransfer.files[0])
    const droppedFile = getValues('logo')
    if (droppedFile && ["image/jpeg", "image/png"].includes(droppedFile.type)) {
      setFile(URL.createObjectURL(droppedFile));
    } else {
      setFile(null);
      toast.error("Only JPG and PNG files are allowed.")
    }
  }; // handleDrop

  const handleDragOver = (event) => {
    event.preventDefault();
  }; // handleDragOver

  return (
    <Grid2 container={isSmallScreenUp} columnGap="12px">
      <Box>
        <FileUploadStyled
          onClick={() => fileInput.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={
            `${errors.logo && errors.logo.message ? '--is-error' : ''}`
          }
        >
          <input
            {...field}
            type="file"
            value=""
            ref={fileInput}
            id='logo'
            name="logo"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            hidden
          />
          {
            file ?
              <PreviewLogoStyled src={file} alt="Preview" /> :
              <UploadIconStyled />
          }
        </FileUploadStyled>
        <Grid2 display="flex" width="100%">
          {errors.logo && typeof errors.logo.message === 'string' && <Typography color="error" style={{ marginTop: "4px", fontSize: "13px" }}>{t(errors.logo.message)}</Typography>}
        </Grid2>
      </Box>

      <Grid2 container alignItems="center" columnGap="4px" alignSelf="flex-start" display={{ 'xs': 'none', 'sm': 'flex' }}>
        <InfoRounded className="text-primary" />
        <Typography component="span" lineHeight="0">
          {t('logo-must-ratio-11-3')}
        </Typography>
      </Grid2>
    </Grid2>
  );
};

export default FileUploader;
