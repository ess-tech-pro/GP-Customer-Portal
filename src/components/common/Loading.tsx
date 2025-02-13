import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type LoadingProps = {
    isLoading: boolean;
    children?: React.ReactNode;
};

// Full screen loading with background
const FullScreenLoading: React.FC<LoadingProps> = ({ isLoading, children }) => {
    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
                <CircularProgress />
            </div>
        );
    }
    return children as React.ReactElement;
};

// Regular loading without background
const Loading: React.FC<LoadingProps> = ({ isLoading, children }) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <CircularProgress />
            </div>
        );
    }
    return children as React.ReactElement;
};

export { FullScreenLoading, Loading };