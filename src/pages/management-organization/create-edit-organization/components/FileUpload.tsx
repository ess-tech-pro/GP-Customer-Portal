import { useState } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import { CloudUpload, InfoRounded } from "@mui/icons-material";
import { toast } from 'react-toastify';
import { ControllerRenderProps, FieldErrors, UseFormGetValues } from "react-hook-form";

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
  const [file, setFile] = useState(null);
  const fileInput = useRef<HTMLInputElement>()

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
    <Grid2>
      <Box
        sx={{
          border: "2px dashed gray",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "#f5f5f5",
        }}
        onClick={() => fileInput.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
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
        <CloudUpload sx={{ fontSize: 50, color: "gray" }} />
        <Typography variant="h6">Select Files to Upload</Typography>
        <Typography variant="body2" color="textSecondary">
          or Drag and Drop, Copy and Paste Files
        </Typography>
        <Grid2 justifyContent="center" display="flex">
          {file && <img src={file} alt="Preview" style={{ height: "100px", marginTop: '16px' }} />}
          {errors.logo && typeof errors.logo.message === 'string' && <Typography color="error" style={{ marginTop: "16px" }}>{errors.logo.message || ''}</Typography>}
        </Grid2>
      </Box>

      <Grid2>
        <InfoRounded />
      </Grid2>
    </Grid2>
  );
};

export default FileUploader;
