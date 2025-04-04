import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#f5f5f5',
        py: 4,
        borderTop: '1px solid #e0e0e0',
        position: 'relative',
        width: '100%',
        zIndex: 1000,
        mt: 4
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Nature's Crate – Fresh, Organic, Straight from the Farm
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              We deliver a variety of organic fruits and vegetables sourced directly from trusted farms. 
              With a focus on freshness, quality, and sustainability, we bring nature's best produce 
              straight to your doorstep—so you can enjoy healthy, farm-fresh goodness every day!
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <InstagramIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Link
                href="https://instagram.com/natures.crate"
                target="_blank"
                color="text.secondary"
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                @natures.crate
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Link
                href="mailto:hello@naturescrate.com"
                color="text.secondary"
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                hello@naturescrate.com
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography color="text.secondary">
                +91 98765 43210
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center" 
          sx={{ mt: 4, pt: 2, borderTop: '1px solid #e0e0e0' }}
        >
          © {new Date().getFullYear()} Nature's Crate. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 