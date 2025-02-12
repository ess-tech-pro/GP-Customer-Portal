// import { AppDispatch } from "@/store/store";
import { Box, Button, Divider, Typography } from "@mui/material"
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
//     events: yup.array(),
// });

const RegisterGameList = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch<AppDispatch>();

    return (
        <Box>
            <Box className="w-full flex justify-between items-center mb-2">
                <Typography>Register Game</Typography>
                <Button onClick={() => navigate('/create-register-game')} variant="contained" color="primary">
                    Create
                </Button>
            </Box>
            <Divider />
        </Box>
    )
}

export default RegisterGameList