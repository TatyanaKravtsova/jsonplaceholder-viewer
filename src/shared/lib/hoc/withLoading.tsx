import React from 'react';

interface WithLoadingProps {
  isLoading?: boolean;
  loadingText?: string;
}

export function withLoading<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const WithLoadingComponent: React.FC<P & WithLoadingProps> = ({
    isLoading = false,
    loadingText = 'Loading...',
    ...props
  }) => {
    if (isLoading) {
      return (
        <div className="loading-state" role="status" aria-live="polite">
          {loadingText}
        </div>
      );
    }
    return <WrappedComponent {...(props as P)} />;
  };

  WithLoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithLoadingComponent;
}



