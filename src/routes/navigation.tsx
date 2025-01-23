import DashboardIcon from "@mui/icons-material/Dashboard";
import DnsIcon from "@mui/icons-material/Dns";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

const navigation = [
    {
        title: "Main",
        links: [
            {
                path: "/",
                title: "Daily Win",
                icon: <DashboardIcon />,
            },
            {
                title: "Slots",
                path: "/slots",
                icon: <SettingsIcon />,
                children: [
                    {
                        path: "/slots/game-library",
                        title: "Game Library",
                        icon: <PeopleIcon />,
                    },
                    {
                        path: "/settings/roadmap",
                        title: "Roadmap",
                        icon: <DnsIcon />,
                    },
                ],
            },
        ],
    },
    {
        title: "Info",
        links: [
            {
                path: "/about",
                title: "About",
                icon: <InfoIcon />,
            },
        ],
    },
];

export default navigation;
