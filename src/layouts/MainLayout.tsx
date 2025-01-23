import { useLayoutContext } from '@/contexts/LayoutContext'
import useIsMobile from '@/hooks/useIsMobile'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { ReactNode } from 'react'
import { SIDEBAR_WIDTH } from './MainLayout/constants'
import Header from './MainLayout/Header'
import Sidebar from './MainLayout/Sidebar/Sidebar'

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
