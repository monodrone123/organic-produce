import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Snackbar,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { LeftPanel, RightPanel } from '../components/SidePanels';

// Mock data for products
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Mango',
    type: 'fruit',
    price: 128,
    image: '/organic-produce/resources/images/Mango.jpg',
  },
  {
    id: '2',
    name: 'Apple',
    type: 'fruit',
    price: 150,
    image: '/organic-produce/resources/images/Apple.webp',
  },
  {
    id: '3',
    name: 'Banana',
    type: 'fruit',
    price: 46,
    image: '/organic-produce/resources/images/Banana.jpeg',
  },
  {
    id: '4',
    name: 'Green Grapes',
    type: 'fruit',
    price: 90,
    image: '/organic-produce/resources/images/Green Grapes.jpg',
  },
  {
    id: '5',
    name: 'Black Grapes',
    type: 'fruit',
    price: 80,
    image: '/organic-produce/resources/images/Black Grapes.jpg',
  },
  {
    id: '6',
    name: 'Guava',
    type: 'fruit',
    price: 50,
    image: '/organic-produce/resources/images/Guava.avif',
  },
  {
    id: '7',
    name: 'Lychee',
    type: 'fruit',
    price: 250,
    image: '/organic-produce/resources/images/Lychee.jpg',
  },
  {
    id: '8',
    name: 'Orange',
    type: 'fruit',
    price: 50,
    image: '/organic-produce/resources/images/Orange.jpg',
  },
  {
    id: '9',
    name: 'Papaya',
    type: 'fruit',
    price: 35,
    image: '/organic-produce/resources/images/Papaya.jpg',
  },
  {
    id: '10',
    name: 'Pears',
    type: 'fruit',
    price: 98,
    image: '/organic-produce/resources/images/Pears.jpg',
  },
  {
    id: '11',
    name: 'Pineapple',
    type: 'fruit',
    price: 40,
    image: '/organic-produce/resources/images/Pineapple.avif',
  },
  {
    id: '12',
    name: 'Pomegranate',
    type: 'fruit',
    price: 130,
    image: '/organic-produce/resources/images/Pomegranate.jpg',
  },
  {
    id: '13',
    name: 'Watermelon',
    type: 'fruit',
    price: 16,
    image: '/organic-produce/resources/images/Watermelon.jpg',
  },
  {
    id: '14',
    name: 'Cherry',
    type: 'fruit',
    price: 520,
    image: '/organic-produce/resources/images/Cherry.jpg',
  },
  {
    id: '15',
    name: 'Mosambi',
    type: 'fruit',
    price: 105,
    image: '/organic-produce/resources/images/Mosambi.jpg',
  },
  {
    id: '16',
    name: 'Tomato',
    type: 'vegetable',
    price: 24,
    image: '/organic-produce/resources/images/Tomato.png',
  },
  {
    id: '17',
    name: 'Onion',
    type: 'vegetable',
    price: 26,
    image: '/organic-produce/resources/images/Onion.jpg',
  },
  {
    id: '18',
    name: 'Potato',
    type: 'vegetable',
    price: 28,
    image: '/organic-produce/resources/images/Potato.avif',
  },
  {
    id: '19',
    name: 'Green Chilli',
    type: 'vegetable',
    price: 160,
    image: '/organic-produce/resources/images/Green Chilli.jpg',
  },
  {
    id: '20',
    name: 'Lemon',
    type: 'vegetable',
    price: 100,
    image: '/organic-produce/resources/images/Lemon.jpg',
  },
  {
    id: '21',
    name: 'Green Capsicum',
    type: 'vegetable',
    price: 50,
    image: '/organic-produce/resources/images/Green Capsicum.jpg',
  },
  {
    id: '22',
    name: 'Amla',
    type: 'vegetable',
    price: 85,
    image: '/organic-produce/resources/images/Amla.jpg',
  },
  {
    id: '23',
    name: 'Beetroot',
    type: 'vegetable',
    price: 41,
    image: '/organic-produce/resources/images/Beetroot.jpg',
  },
  {
    id: '24',
    name: 'Bitter gourd',
    type: 'vegetable',
    price: 32,
    image: '/organic-produce/resources/images/Bitter gourd.jpg',
  },
  {
    id: '25',
    name: 'Bottle gourd',
    type: 'vegetable',
    price: 33,
    image: '/organic-produce/resources/images/Bottle gourd.jpg',
  },
  {
    id: '26',
    name: 'Cabbage',
    type: 'vegetable',
    price: 21,
    image: '/organic-produce/resources/images/Cabbage.avif',
  },
  {
    id: '27',
    name: 'Carrot',
    type: 'vegetable',
    price: 50,
    image: '/organic-produce/resources/images/Carrot.jpg',
  },
  {
    id: '28',
    name: 'Cauliflower',
    type: 'vegetable',
    price: 26,
    image: '/organic-produce/resources/images/Cauliflower.jpg',
  },
  {
    id: '29',
    name: 'Coconut',
    type: 'vegetable',
    price: 67,
    image: '/organic-produce/resources/images/Coconut.avif',
  },
  {
    id: '30',
    name: 'Coriander Leaves',
    type: 'vegetable',
    price: 14,
    image: '/organic-produce/resources/images/Coriander Leaves.avif',
  },
  {
    id: '31',
    name: 'Cucumber',
    type: 'vegetable',
    price: 29,
    image: '/organic-produce/resources/images/Cucumber.avif',
  },
  {
    id: '32',
    name: 'Brinjal',
    type: 'vegetable',
    price: 38,
    image: '/organic-produce/resources/images/Brinjal.jpg',
  },
  {
    id: '33',
    name: 'Garlic',
    type: 'vegetable',
    price: 180,
    image: '/organic-produce/resources/images/Garlic.jpg',
  },
  {
    id: '34',
    name: 'Ginger',
    type: 'vegetable',
    price: 160,
    image: '/organic-produce/resources/images/Ginger.avif',
  },
  {
    id: '35',
    name: 'Green Peas',
    type: 'vegetable',
    price: 160,
    image: '/organic-produce/resources/images/Green Peas.jpg',
  },
  {
    id: '36',
    name: 'Pumpkin',
    type: 'vegetable',
    price: 25,
    image: '/organic-produce/resources/images/Pumpkin.jpg',
  },
  {
    id: '37',
    name: 'Spinach',
    type: 'vegetable',
    price: 16,
    image: '/organic-produce/resources/images/Spinach.jpg',
  }
];

const Home: React.FC = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { addItem } = useCart();
  const { searchTerm, filterType } = useSearch();

  const handleQuantityChange = (id: string, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setQuantities(prev => ({
      ...prev,
      [id]: numValue || 0
    }));
  };

  const adjustQuantity = (id: string, delta: number) => {
    const currentValue = quantities[id] || 0;
    const newValue = Math.max(0, parseFloat((currentValue + delta).toFixed(1)));
    setQuantities(prev => ({
      ...prev,
      [id]: newValue
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      addItem(product, quantity);
      setQuantities(prev => ({ ...prev, [product.id]: 0 }));
      setSnackbarOpen(true);
    }
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || product.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <Box sx={{ mt: 10, mb: 4 }}>
      <LeftPanel />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    borderColor: '#0c831f'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ 
                    objectFit: 'cover',
                    borderBottom: '1px solid #e0e0e0'
                  }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="h2"
                    sx={{ 
                      color: '#1a1a1a',
                      fontWeight: 600
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#0c831f',
                      fontWeight: 500,
                      mb: 2
                    }}
                  >
                    ₹{product.price} per kg
                  </Typography>
                  <Box sx={{ 
                    mt: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      bgcolor: '#f8f8f8',
                      '&:hover': {
                        borderColor: '#0c831f'
                      }
                    }}>
                      <IconButton
                        size="small"
                        onClick={() => adjustQuantity(product.id, -0.1)}
                        sx={{ 
                          color: '#1a1a1a',
                          '&:hover': {
                            color: '#0c831f'
                          }
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <TextField
                        size="small"
                        value={quantities[product.id] ?? ''}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        variant="standard"
                        placeholder="0"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                          disableUnderline: true,
                          sx: { 
                            width: '80px',
                            '& input': {
                              textAlign: 'center',
                              fontSize: '0.875rem',
                              p: 0,
                              color: '#1a1a1a',
                              '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                '-webkit-appearance': 'none',
                                margin: 0
                              }
                            }
                          }
                        }}
                        inputProps={{
                          type: 'number',
                          step: 'any',
                          min: '0',
                          style: { textAlign: 'center' }
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => adjustQuantity(product.id, 0.1)}
                        sx={{ 
                          color: '#1a1a1a',
                          '&:hover': {
                            color: '#0c831f'
                          }
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => handleAddToCart(product)}
                      disabled={!quantities[product.id]}
                      sx={{ 
                        bgcolor: '#0c831f',
                        color: 'white',
                        '&:hover': {
                          bgcolor: '#0a7019'
                        },
                        '&.Mui-disabled': {
                          bgcolor: '#e0e0e0',
                          color: '#666666'
                        }
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <RightPanel />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Item added to cart"
      />
    </Box>
  );
};

export default Home; 