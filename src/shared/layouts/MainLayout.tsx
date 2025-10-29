import React from 'react';
import Header from '../../widgets/LayoutHeader/Header.tsx';
import Footer from '../../widgets/LayoutFooter/Footer.tsx';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;