import { ROUTE_PATH } from '@/constants/routing'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DnsIcon from '@mui/icons-material/Dns'
import InfoIcon from '@mui/icons-material/Info'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'

const navigation = [
	{
		title: 'Main',
		links: [
			{
				path: '/',
				title: 'Daily Win',
				icon: <DashboardIcon />,
			},
			{
				title: 'Games',
				path: ROUTE_PATH.GAME.LIST,
				icon: <SettingsIcon />,
				children: [
					{
						path: ROUTE_PATH.GAME.LIST,
						title: 'Game list',
						icon: <DnsIcon />,
					},
					{
						path: ROUTE_PATH.GAME.DETAIL,
						title: 'Game detail',
						icon: <PeopleIcon />,
					},
				],
			},
			{
				title: 'Game Management',
				path: ROUTE_PATH.GAME_MANAGEMENT.CREATE_GAME,
				icon: <SettingsIcon />,
				children: [
					{
						path: ROUTE_PATH.GAME_MANAGEMENT.CREATE_GAME,
						title: 'Create Game',
						icon: <DnsIcon />,
					},
				],
			},
		],
	},
	{
		title: 'Info',
		links: [
			{
				path: '/about',
				title: 'About',
				icon: <InfoIcon />,
			},
		],
	},
]

export default navigation
