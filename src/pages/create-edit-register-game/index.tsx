import { Box, Button, FormHelperText, MenuItem } from "@mui/material"
import FormControl from '@mui/material/FormControl';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formattedOptionTypes } from "@/utils/utils";
import { registerGame } from "@/store/slices/gameSlice";
import CustomTextField from "@/components/mui/TextField";

const FILE_SIZE = 5 * 1024 * 1024; // 5MB
// const SUPPORTED_FORMATS = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];


const schema = yup.object().shape({
    status: yup.string().required("Status is required"),
    category: yup.string().required("Game Name is required"),
    gameName: yup.string().required("Game Name is required"),
    gameType: yup.string().required("Game Type is required"),
    gameEngine: yup.string().required("Game Engine is required"),
    orientation: yup.string().required("orientation is required"),
    events: yup.array().min(1, "Events is required").required("Events is required"),
    description: yup.string(),
    gameDocuments: yup.mixed()
        .required("File is required")
        .test("fileSize", "File size is too large (max 5MB)", (value) => {
            return value && value[0]?.size <= FILE_SIZE;
        })
    // .test("fileType", "Unsupported file format", (value) => {
    //     return value && SUPPORTED_FORMATS.includes(value[0]?.type);
    // }),
});

const RegisterGame = () => {
    const dispatch = useDispatch<AppDispatch>();
    const optionsRegisterGame: any = useSelector((state: RootState) => state.options.optionsRegisterGame);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            status: "draft",
            category: "",
            gameName: "",
            gameType: "",
            gameEngine: "",
            orientation: "",
            events: [],
            gameDocuments: ""

        },
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        const formData = new FormData()

        if (data.gameDocuments && data.gameDocuments[0]) {
            formData.append("gameDocuments", data.gameDocuments[0]);
        }

        formData.append("gameData", JSON.stringify({
            status: data.status,
            category: data.category,
            gameName: data.gameName,
            gameType: data.gameType,
            gameEngine: data.gameEngine,
            orientation: data.orientation,
            events: data.events
        }));

        const res = await dispatch(registerGame(formData))
        console.log(res)

    };

    return (
        <Box sx={{ width: '100%' }}>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
                <Box className="w-full flex flex-col">
                    <Box>
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
                                                id='category'
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
                                    <Controller
                                        name='gameType'
                                        control={control}
                                        render={({ field }) => (
                                            <CustomTextField
                                                select
                                                fullWidth
                                                id='gameType'
                                                {...field}
                                                error={Boolean(errors.gameType)}
                                            >
                                                {formattedOptionTypes(optionsRegisterGame.gameType).map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CustomTextField>
                                        )}
                                    />
                                    {errors.gameType && <FormHelperText error>{errors.gameType.message}</FormHelperText>}
                                </FormControl>
                            </Box>
                        </Box>
                        <Box className="flex flex-row items-center mb-2">
                            <Box className="flex-[1]">
                                <label htmlFor="username">*Game Engine</label>
                            </Box>
                            <Box className="flex-[9]">
                                <FormControl className="w-120">
                                    <Controller
                                        name='gameEngine'
                                        control={control}
                                        render={({ field }) => (
                                            <CustomTextField
                                                select
                                                fullWidth
                                                id='gameEngine'
                                                {...field}
                                                error={Boolean(errors.gameEngine)}
                                            >
                                                {formattedOptionTypes(optionsRegisterGame.gameEngine).map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CustomTextField>
                                        )}
                                    />
                                    {errors.gameEngine && <FormHelperText error>{errors.gameEngine.message}</FormHelperText>}
                                </FormControl>
                            </Box>
                        </Box>
                        <Box className="flex flex-row items-center mb-2">
                            <Box className="flex-[1]">
                                <label htmlFor="username">*Orientation</label>
                            </Box>
                            <Box className="flex-[9]">
                                <FormControl className="w-120">
                                    <Controller
                                        name='orientation'
                                        control={control}
                                        render={({ field }) => (
                                            <CustomTextField
                                                select
                                                fullWidth
                                                id='orientation'
                                                {...field}
                                                error={Boolean(errors.orientation)}
                                            >
                                                {formattedOptionTypes(optionsRegisterGame.orientation).map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CustomTextField>
                                        )}
                                    />
                                    {errors.orientation && <FormHelperText error>{errors.orientation.message}</FormHelperText>}
                                </FormControl>
                            </Box>
                        </Box>
                        <Box className="flex flex-row items-center mb-2">
                            <Box className="flex-[1]">
                                <label htmlFor="username">*Event</label>
                            </Box>
                            <Box className="flex-[9]">
                                <FormControl className="w-120">
                                    <Controller
                                        name='events'
                                        control={control}
                                        render={({ field }) => (
                                            <CustomTextField
                                                select
                                                fullWidth
                                                id='events'
                                                {...field}
                                                slotProps={{
                                                    select: {
                                                        multiple: true,
                                                    }
                                                }}
                                                error={Boolean(errors.events)}
                                            >
                                                {formattedOptionTypes(optionsRegisterGame.event).map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CustomTextField>
                                        )}
                                    />
                                    {errors.events && <FormHelperText error>{errors.events.message}</FormHelperText>}
                                </FormControl>
                            </Box>
                        </Box>
                        <Box className="flex flex-row items-center mb-2">
                            <Box className="flex-[1]">
                                <label htmlFor="username">*Document</label>
                            </Box>
                            <Box className="flex-[9]">
                                <Box className="flex items-center">
                                    <Controller
                                        name="gameDocuments"
                                        control={control}
                                        defaultValue={null}
                                        render={({ field }) => (
                                            <input
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                id="upload-file"
                                                type="file"
                                                onChange={(e) => {
                                                    field.onChange(e.target.files);
                                                    setSelectedFile(e.target.files?.[0] || null)
                                                }}
                                            />
                                        )}
                                    />
                                    <label htmlFor="upload-file">
                                        <Button variant="contained" component="span">
                                            Upload File
                                        </Button>
                                    </label>
                                    {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                                    {errors.gameDocuments && <p style={{ color: "red" }}>{errors.gameDocuments.message}</p>}
                                </Box>
                            </Box>
                        </Box>
                        <Box className="flex flex-row mb-2">
                            <Box className="flex-[1]">
                                <label htmlFor="username">Description</label>
                            </Box>
                            <Box className="flex-[9]">
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <ReactQuill
                                            {...field}
                                            onChange={(content) => field.onChange(content)}
                                            theme="snow"
                                            placeholder="Write something..."
                                            style={{ height: '300px' }}
                                        />
                                    )}
                                />
                            </Box>
                        </Box>

                    </Box>
                    <Box className="w-full flex justify-center mt-20">
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

export default RegisterGame