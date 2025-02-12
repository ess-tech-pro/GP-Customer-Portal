import React from 'react';
import { FullScreenLoading } from "@/components/Common/Loading";
import { userInfo } from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

interface IProctedRoute {
    children: React.ReactNode,
    requireAuth: boolean,
    requiredPermission?: string
}

const ProtectedRoute = ({ children, requireAuth, requiredPermission = null }: IProctedRoute) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user);
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = localStorage.getItem('accessToken');
    const hasPermission = useMemo(() => requiredPermission && user?.permissions?.[requiredPermission], [user, requiredPermission]);
    console.log('hasPermission ', hasPermission)

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            await dispatch(userInfo());
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && !user) {
            fetchUserData();
        }
    }, [user, isAuthenticated]);

    if (isLoading) {
        return <FullScreenLoading isLoading={isLoading} />;
    }

    // Redirect if user is not authenticated
    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
    }

    // Redirect if user is authenticated and doesn't require authentication
    if (!requireAuth && isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Redirect if user lacks the required permission
    // if (!hasPermission) {
    //     return <Navigate to="/" replace />;
    // }

    // Return children if all conditions are satisfied
    return children;
};

export default ProtectedRoute;