import Box from '@mui/material/Box'
import { ReactNode } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Header from './MainLayout/Header'
import { SIDEBAR_WIDTH } from './MainLayout/constants'
import Sidebar from './MainLayout/Sidebar/Sidebar'
import useIsMobile from '@/hooks/useIsMobile'
import { useLayoutContext } from '@/contexts/LayoutContext'

interface MainLayoutProps {
	children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
	const { sidebarOpen } = useLayoutContext()
	const isMobile = useIsMobile()

	return (
		<>
			<Sidebar />
			<Box
				sx={{
					display: 'flex',
					ml: !isMobile && sidebarOpen ? `${SIDEBAR_WIDTH}px` : 0,
					transition: (theme) =>
						theme.transitions.create(['margin'], {
							easing: sidebarOpen
								? theme.transitions.easing.easeOut
								: theme.transitions.easing.sharp,
							duration: sidebarOpen
								? theme.transitions.duration.enteringScreen
								: theme.transitions.duration.leavingScreen,
						}),
				}}
			>
				<Header />
				<Box
					component="main"
					sx={{
						p: 3,
					}}
				>
					<Toolbar />
					<main className="flex-1 container mx-auto px-4 py-6">{children}</main>
				</Box>
			</Box>
		</>
	)
}
