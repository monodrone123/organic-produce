import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import theme from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PrivateRoute from './components/PrivateRoute';
import { initGA, logPageView } from './analytics';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize GA
    initGA();
    // Log initial page view
    logPageView();
    
    // Log page views on route changes
    const handleRouteChange = () => {
      logPageView();
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <Router>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                minHeight: '100vh',
                position: 'relative'
              }}>
                <Navbar />
                <Box sx={{ 
                  flex: 1,
                  pb: 4, // Add padding bottom to prevent content overlap with footer
                  position: 'relative',
                  zIndex: 1
                }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/admin"
                      element={
                        <PrivateRoute role="admin">
                          <AdminDashboard />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/cart"
                      element={
                        <PrivateRoute role="user">
                          <Cart />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/checkout"
                      element={
                        <PrivateRoute role="user">
                          <Checkout />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </Box>
                <Footer />
              </Box>
            </Router>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
