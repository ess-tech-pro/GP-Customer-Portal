import { ROUTE_PATH } from '@/constants/routing'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DnsIcon from '@mui/icons-material/Dns'
import InfoIcon from '@mui/icons-material/Info'
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
        path: ROUTE_PATH.GAME,
        icon: <SettingsIcon />,
        children: [
          {
            path: ROUTE_PATH.GAME,
            title: 'Game list',
            icon: <DnsIcon />,
          },
        ],
      },
      {
        title: 'Game Management',
        path: ROUTE_PATH.GAME_MANAGEMENT.REGISTER_GAME_LIST,
        icon: <SettingsIcon />,
        children: [
          {
            path: ROUTE_PATH.GAME_MANAGEMENT.REGISTER_GAME_LIST,
            title: 'Register Game List',
            icon: <DnsIcon />,
          },
          // {
          //   path: ROUTE_PATH.GAME_MANAGEMENT.CREATE_REGISTER_GAME,
          //   title: 'Create Register Game',
          //   icon: <DnsIcon />,
          // },
        ],
      },
      {
        title: 'Mng User',
        path: ROUTE_PATH.MANAGEMENT_USER,
        icon: <SettingsIcon />,
        children: [
          {
            path: ROUTE_PATH.MANAGEMENT_USER,
            title: 'User list',
            icon: <DnsIcon />,
          }
        ],
      },
      {
        title: 'Mng Organization',
        path: ROUTE_PATH.MANAGEMENT_ORGANIZATION.ORGANIZATION_LIST,
        icon: <SettingsIcon />,
        children: [
          {
            path: ROUTE_PATH.MANAGEMENT_ORGANIZATION.ORGANIZATION_LIST,
            title: 'Organization list',
            icon: <DnsIcon />,
          }
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
