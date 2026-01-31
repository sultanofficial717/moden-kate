import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';
import { Sustainability } from './pages/Sustainability';
import { StoreProvider } from './context/StoreContext';

// Wrapper to conditionally render layout elements if needed in future
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {!isAdminRoute && (
        <>
          <AnnouncementBar />
          <Header />
        </>
      )}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

const App: React.FC = () => {
  return (
    <StoreProvider>
      <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/sustainability" element={<Sustainability />} />
            </Routes>
          </Layout>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
