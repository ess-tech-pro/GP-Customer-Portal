import { Box, Tab, Tabs } from "@mui/material"
import * as React from 'react';
import GeneralSetting from "./components/general-setting";
import SpecialParameters from "./components/special-parameters";

interface TabPanelProps {
    children: React.ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const CreateGame = () => {
    const [tab, setTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };



    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="General Setting" {...a11yProps(0)} />
                    <Tab label="Special Parameters" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={tab} index={0}>
                <GeneralSetting />
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
                <SpecialParameters />
            </CustomTabPanel>
        </Box>
    )
}

export default CreateGame