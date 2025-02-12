import { Box, Button, FormHelperText } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RootState } from "@/store/store";
import { useSelector } from 'react-redux';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formattedOptionTypes } from "@/utils/utils";
import CustomTextField from "@/components/mui/TextField";

const schema = yup.object().shape({
  category: yup.string().required("Category is required"),
  gameName: yup.string().required("Game Name is required"),
});

const RegisterGame = () => {
  const optionsRegisterGame: any = useSelector((state: RootState) => state.options.optionsRegisterGame);
  console.log(optionsRegisterGame)
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      gameName: ""
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Box className="flex flex-row items-center mb-2">
          <Box className="flex-[1]">
            <label htmlFor="username">*Category</label>
          </Box>
          <Box className="flex-[9]">
            <FormControl className="w-120">
              <Controller
                name='category'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    {...field}
                    error={Boolean(errors.category)}
                  >
                    {formattedOptionTypes(optionsRegisterGame.categories).map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
              {errors.category && <FormHelperText error>{errors.category.message}</FormHelperText>}
            </FormControl>
          </Box>
        </Box>
        <Box className="flex flex-row items-center mb-2">
          <Box className="flex-[1]">
            <label htmlFor="username">*Game Name</label>
          </Box>
          <Box className="flex-[9]">
            <FormControl className="w-120">
              <Controller
                name='gameName'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    id='gameName'
                    fullWidth
                    placeholder='Game Name'
                    {...(errors.gameName && { error: true, helperText: errors.gameName?.message })}
                  />
                )}
              />
            </FormControl>
          </Box>
        </Box>
        <Box className="flex flex-row items-center mb-2">
          <Box className="flex-[1]">
            <label htmlFor="username">*Game Type</label>
          </Box>
          <Box className="flex-[9]">
            <FormControl className="w-120">
              <InputLabel id="demo-simple-select-label">Game Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Game Type 1</MenuItem>
                <MenuItem value={20}>Game Type 2</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box className="flex flex-row items-center mb-2">
          <Box className="flex-[1]">
            <label htmlFor="username">*Game Engine</label>
          </Box>
          <Box className="flex-[9]">
            <FormControl className="w-120">
              <InputLabel id="demo-simple-select-label">Game Engine</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Game Engine 1</MenuItem>
                <MenuItem value={20}>Game Engine 2</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box className="flex flex-row items-center mb-2">
          <Box className="flex-[1]">
            <label htmlFor="username">*Orientation</label>
          </Box>
          <Box className="flex-[9]">
            <FormControl className="w-120">
              <InputLabel id="demo-simple-select-label">Orientation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Orientation 1</MenuItem>
                <MenuItem value={20}>Orientation 2</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box className="flex flex-row items-center mb-2">
          <Box className="flex-[1]">
            <label htmlFor="username">*Event</label>
          </Box>
          <Box className="flex-[9]">
            <FormControl className="w-120">
              <InputLabel id="demo-simple-select-label">Event</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >
                <MenuItem value={10}>Event 1</MenuItem>
                <MenuItem value={20}>Event 2</MenuItem>
                <MenuItem value={20}>Event 3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box className="flex flex-row items-center mb-2">
          <Box className="flex-[1]">
            <label htmlFor="username">*Document</label>
          </Box>
          <Box className="flex-[9]">
            <Box className="flex items-center">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="upload-file">
                <Button variant="contained" component="span">
                  Upload File
                </Button>
              </label>
              {fileName && <p>Selected File: {fileName}</p>}
            </Box>
          </Box>
        </Box>
        <Box className="flex flex-row mb-2">
          <Box className="flex-[1]">
            <label htmlFor="username">Description</label>
          </Box>
          <Box className="flex-[9]">
            <ReactQuill style={{ height: '300px' }} theme="snow" value={content} onChange={setContent} />
          </Box>
        </Box>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 10 }}>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default RegisterGame
