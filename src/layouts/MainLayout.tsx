import { useLayoutContext } from '@/contexts/LayoutContext'
import useIsMobile from '@/hooks/useIsMobile'
import Box from '@mui/material/Box'
import { ReactNode } from 'react'
import { SIDEBAR_WIDTH } from './MainLayout/constants'
import Header from './MainLayout/Header'
import Sidebar from './MainLayout/Sidebar/Sidebar'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { getOptionsRegisterGame } from '@/store/slices/optionsSlice'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { sidebarOpen } = useLayoutContext()
  const isMobile = useIsMobile()
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getOptionsRegisterGame())
  }, [])


  return (
    <>
      <Sidebar />
      <Box
        sx={{
          display: 'flex',
          background: '#000',
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
          component="div"
          sx={{
            p: 4,
            mt: 16,
            background: 'white',
            borderRadius: '16px 16px 0 0',
            width: '100%'
          }}
        >
          <main className="flex-1 container mx-auto">{children}</main>
        </Box>
      </Box>
    </>
  )
}
