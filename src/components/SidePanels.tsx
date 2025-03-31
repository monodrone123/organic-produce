import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  IconButton,
  Badge,
} from '@mui/material';
import {
  LocalOffer as OfferIcon,
  Timer as TimerIcon,
  Restaurant as RecipeIcon,
  ShoppingBasket as BasketIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

export const LeftPanel: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 80,
        bottom: 0,
        width: { lg: '20%', xl: '15%' },
        maxWidth: 300,
        overflowY: 'auto',
        p: 2,
        display: { xs: 'none', lg: 'block' },
        transition: 'all 0.3s ease-in-out',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#e0e0e0',
          borderRadius: '3px',
        },
        '& .MuiPaper-root': {
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }
        },
        '& .MuiListItem-button': {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateX(4px)',
            bgcolor: '#f5f5f5',
          }
        },
        '& .MuiChip-root': {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }
      }}
    >
      <Paper elevation={0} sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
          Today's Deals
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText 
              primary={<Typography sx={{ color: '#1a1a1a' }}>Fresh Fruits Bundle</Typography>}
              secondary={<Typography sx={{ color: '#0c831f', fontWeight: 500 }}>Save 20%</Typography>}
            />
            <Chip 
              size="small" 
              icon={<TimerIcon />} 
              label="2h left"
              sx={{ bgcolor: '#1a1a1a', color: 'white' }}
            />
          </ListItem>
          <Divider sx={{ my: 1 }} />
          <ListItem>
            <ListItemText 
              primary={<Typography sx={{ color: '#1a1a1a' }}>Organic Vegetables</Typography>}
              secondary={<Typography sx={{ color: '#0c831f', fontWeight: 500 }}>Buy 2 Get 1</Typography>}
            />
            <Chip 
              size="small" 
              icon={<OfferIcon />} 
              label="New"
              sx={{ bgcolor: '#0c831f', color: 'white' }}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
          Categories
        </Typography>
        <List dense>
          <ListItem button sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
            <ListItemText primary={<Typography sx={{ color: '#1a1a1a' }}>Seasonal Fruits</Typography>} />
          </ListItem>
          <ListItem button sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
            <ListItemText primary={<Typography sx={{ color: '#1a1a1a' }}>Fresh Vegetables</Typography>} />
          </ListItem>
          <ListItem button sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
            <ListItemText primary={<Typography sx={{ color: '#1a1a1a' }}>Organic Selection</Typography>} />
          </ListItem>
          <ListItem button sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
            <ListItemText primary={<Typography sx={{ color: '#1a1a1a' }}>Daily Essentials</Typography>} />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export const RightPanel: React.FC = () => {
  const { items, total } = useCart();

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        top: 80,
        bottom: 0,
        width: { lg: '20%', xl: '15%' },
        maxWidth: 300,
        overflowY: 'auto',
        p: 2,
        display: { xs: 'none', lg: 'block' },
        transition: 'all 0.3s ease-in-out',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#e0e0e0',
          borderRadius: '3px',
        },
        '& .MuiPaper-root': {
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }
        },
        '& .MuiListItem-root': {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateX(-4px)',
            bgcolor: '#f5f5f5',
          }
        },
        '& .MuiIconButton-root': {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'rotate(10deg)',
          }
        }
      }}
    >
      <Paper elevation={0} sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>
          Quick Cart
        </Typography>
        {items.length > 0 ? (
          <>
            <List dense>
              {items.slice(0, 3).map((item) => (
                <ListItem key={item.product.id}>
                  <ListItemText 
                    primary={<Typography sx={{ color: '#1a1a1a' }}>{item.product.name}</Typography>}
                    secondary={
                      <Typography sx={{ color: '#0c831f', fontWeight: 500 }}>
                        {`${item.quantity}kg · ₹${(item.quantity * item.product.price).toFixed(2)}`}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2" sx={{ color: '#1a1a1a' }}>Total:</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#0c831f' }}>
                ₹{total.toFixed(2)}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography variant="body2" sx={{ color: '#666666' }}>
            Your cart is empty
          </Typography>
        )}
      </Paper>

      <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
          Recipe Ideas
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText 
              primary={<Typography sx={{ color: '#1a1a1a' }}>Mixed Fruit Salad</Typography>}
              secondary={<Typography sx={{ color: '#0c831f' }}>Using items in your cart</Typography>}
            />
            <IconButton size="small" sx={{ color: '#1a1a1a' }}>
              <RecipeIcon fontSize="small" />
            </IconButton>
          </ListItem>
          <Divider sx={{ my: 1 }} />
          <ListItem>
            <ListItemText 
              primary={<Typography sx={{ color: '#1a1a1a' }}>Vegetable Stir Fry</Typography>}
              secondary={<Typography sx={{ color: '#0c831f' }}>Quick 15-min recipe</Typography>}
            />
            <IconButton size="small" sx={{ color: '#1a1a1a' }}>
              <RecipeIcon fontSize="small" />
            </IconButton>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}; 