import React from 'react';

type LoadingProps = {
    isLoading: boolean;
    children?: React.ReactNode;
};

// Spinner component that's shared between both loaders
const Spinner = () => (
    <div className="w-12 h-12 border-4 rounded-full border-gray-300 border-t-blue-500 animate-spin" />
);

// Full screen loading with background
const FullScreenLoading: React.FC<LoadingProps> = ({ isLoading, children }) => {
    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
                <Spinner />
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
                <Spinner />
            </div>
        );
    }
    return children as React.ReactElement;
};

export { FullScreenLoading, Loading };