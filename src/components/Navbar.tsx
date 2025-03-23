import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ShoppingCart, Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon, Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { items, total, updateQuantity, removeItem } = useCart();
  const { searchTerm, setSearchTerm, filterType, setFilterType } = useSearch();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalItems = items.length;

  const handleQuantityChange = (productId: string, value: string) => {
    const quantity = parseFloat(value);
    if (!isNaN(quantity) && quantity >= 0) {
      if (quantity === 0) {
        removeItem(productId);
      } else {
        updateQuantity(productId, quantity);
      }
    }
  };

  const CartDrawer = () => (
    <Drawer
      anchor="right"
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%'
      }}>
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            My Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </Typography>
          <IconButton onClick={() => setCartOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {items.length === 0 ? (
          <Box sx={{ 
            p: 3, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
          }}>
            <ShoppingCart sx={{ fontSize: 64, color: '#e0e0e0', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Your cart is empty
            </Typography>
          </Box>
        ) : (
          <>
            <List sx={{ flex: 1, overflowY: 'auto', py: 0 }}>
              {items.map((item) => (
                <React.Fragment key={item.product.id}>
                  <ListItem sx={{ py: 2 }}>
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {item.product.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeItem(item.product.id)}
                          sx={{ color: '#666' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between'
                      }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          border: '1px solid #e0e0e0',
                          borderRadius: 1,
                          bgcolor: '#f8f8f8'
                        }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.product.id, (item.quantity - 0.1).toFixed(1))}
                            sx={{ 
                              color: '#1a73e8',
                              '&:hover': { bgcolor: 'transparent' }
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <TextField
                            size="small"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.product.id, e.target.value)}
                            variant="standard"
                            InputProps={{
                              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                              disableUnderline: true,
                              sx: { 
                                width: '80px',
                                textAlign: 'center',
                                '& input': {
                                  textAlign: 'center',
                                  fontSize: '0.875rem',
                                  p: 0
                                }
                              }
                            }}
                            inputProps={{
                              step: 0.1,
                              min: 0,
                              type: 'number',
                              style: { textAlign: 'center' }
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.product.id, (item.quantity + 0.1).toFixed(1))}
                            sx={{ 
                              color: '#1a73e8',
                              '&:hover': { bgcolor: 'transparent' }
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Typography sx={{ fontWeight: 500, color: '#1a73e8' }}>
                          ₹{(item.quantity * item.product.price).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ 
              p: 2, 
              borderTop: '1px solid #f0f0f0',
              bgcolor: '#fff'
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 2
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Subtotal
                </Typography>
                <Typography variant="h6" sx={{ color: '#1a73e8', fontWeight: 600 }}>
                  ₹{total.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setCartOpen(false);
                  navigate('/checkout');
                }}
                sx={{ 
                  bgcolor: '#0c831f',
                  '&:hover': {
                    bgcolor: '#0a7019'
                  },
                  textTransform: 'none',
                  py: 1.5,
                  fontSize: '1rem'
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: 'white', 
        color: 'text.primary',
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Box
            component={Link}
            to="/"
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              minWidth: 'fit-content',
              gap: 2
            }}
          >
            <Box
              component="img"
              src="/resources/images/Logo.png"
              alt="Nature's Crate Logo"
              sx={{ 
                height: 45,
                width: 45,
                borderRadius: '50%',
                bgcolor: '#1a1a1a',
                p: 1,
                objectFit: 'contain'
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: '#1a1a1a',
                  lineHeight: 1,
                  fontSize: '1.1rem'
                }}
              >
                Nature's Crate
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#4CAF50',
                  letterSpacing: '0.5px',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  mt: 0.5
                }}
              >
                PICKED BY NATURE, DELIVERED BY US
              </Typography>
            </Box>
          </Box>

          {/* Search and Filter Section */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            flex: 1,
            alignItems: 'center',
            maxWidth: 700,
            mx: 'auto'
          }}>
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                px: 2,
                py: 0.5,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                '&:focus-within': {
                  border: '1px solid #0c831f',
                }
              }}
            >
              <SearchIcon sx={{ color: '#666', mr: 1 }} />
              <TextField
                placeholder="Search for items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="standard"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: { 
                    fontSize: '0.875rem',
                  }
                }}
              />
            </Paper>

            <FormControl 
              size="small"
              sx={{ 
                minWidth: 120,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0c831f',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0c831f',
                  }
                }
              }}
            >
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                displayEmpty
              >
                <MenuItem value="all">All Items</MenuItem>
                <MenuItem value="vegetable">Vegetables</MenuItem>
                <MenuItem value="fruit">Fruits</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {user ? (
            <>
              {user.role === 'admin' ? (
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/admin"
                  sx={{ 
                    color: '#1a73e8',
                    textTransform: 'none',
                    minWidth: 'fit-content'
                  }}
                >
                  Admin Dashboard
                </Button>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      py: 1,
                      px: 2, 
                      display: 'flex', 
                      alignItems: 'center',
                      cursor: 'pointer',
                      bgcolor: '#0c831f',
                      color: 'white',
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: '#0a7019'
                      }
                    }}
                    onClick={() => setCartOpen(true)}
                  >
                    <Badge 
                      badgeContent={totalItems} 
                      color="error"
                      sx={{ 
                        mr: 1,
                        '& .MuiBadge-badge': {
                          bgcolor: '#ff3b30',
                          color: 'white'
                        }
                      }}
                    >
                      <ShoppingCart />
                    </Badge>
                    <Typography sx={{ fontWeight: 500 }}>₹{total.toFixed(2)}</Typography>
                  </Paper>
                </Box>
              )}
              <Button 
                onClick={handleLogout} 
                sx={{ 
                  color: '#666',
                  textTransform: 'none',
                  minWidth: 'fit-content'
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button 
              component={Link} 
              to="/login"
              sx={{ 
                color: '#1a73e8',
                textTransform: 'none',
                minWidth: 'fit-content'
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
      <CartDrawer />
    </AppBar>
  );
};

export default Navbar; 