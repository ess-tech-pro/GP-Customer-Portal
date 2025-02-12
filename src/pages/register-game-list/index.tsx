// import CustomTextField from "@/components/mui/TextField";
// import { AppDispatch } from "@/store/store";
// import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, FormControl, Typography } from "@mui/material"
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
// import * as yup from "yup";

// const schema = yup.object().shape({
//     status: yup.string(),
//     category: yup.string(),
//     gameName: yup.string(),
//     gameType: yup.string(),
//     gameEngine: yup.string(),
//     orientation: yup.string(),
//     studio: yup.string(),
//     events: yup.array(),
// });

const RegisterGameList = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch<AppDispatch>();

    // const {
    //     control,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm({
    //     defaultValues: {
    //         status: "DRAFT",
    //         category: "",
    //         gameName: "",
    //         gameType: "",
    //         gameEngine: "",
    //         orientation: "",
    //         studio: "",
    //         events: [],

    //     },
    //     resolver: yupResolver(schema),
    // });

    return (
        <Box>
            <Box className="w-full flex justify-between items-center mb-2">
                <Typography>Register Game</Typography>
                <Button onClick={() => navigate('/create-register-game')} variant="contained" color="primary">
                    Create
                </Button>
            </Box>
            <Divider />
            <Box>
                <Box className="flex flex-col">
                    <Box className="flex-[1]">
                        <label htmlFor="username">*Game Name</label>
                    </Box>
                    <Box className="flex-[9]">
                        <FormControl className="w-100">
                            zxczxc
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default RegisterGameList