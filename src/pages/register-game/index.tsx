import { Box, Button, TextField, Typography } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RootState } from "@/store/store";
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

const RegisterGame = () => {
    const { t } = useTranslation('registerGame');
    const optionsRegisterGame = useSelector((state: RootState) => state.options.optionsRegisterGame);
    console.log(optionsRegisterGame)
    const [content, setContent] = useState("");
    const [fileName, setFileName] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h3">{t('title')}</Typography>

            <Box className="flex flex-row items-center mb-2">
                <Box className="flex-[1]">
                    <label htmlFor="username">*Category</label>
                </Box>
                <Box className="flex-[9]">
                    <FormControl className="w-120">
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                        >
                            <MenuItem value={10}>Category 1</MenuItem>
                            <MenuItem value={20}>Category 2</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Box className="flex flex-row items-center mb-2">
                <Box className="flex-[1]">
                    <label htmlFor="username">*Game Name</label>
                </Box>
                <Box className="flex-[9]">
                    <FormControl className="w-120">
                        <TextField />
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
        </Box>
    )
}

export default RegisterGame