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
        py: 2,
        borderTop: '1px solid #e0e0e0',
        position: 'relative',
        width: '100%',
        zIndex: 1000,
        mt: 2
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Nature's Crate – Fresh, Organic, Straight from the Farm. We deliver organic produce sourced directly from trusted farms.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InstagramIcon sx={{ mr: 0.5, fontSize: '1rem', color: 'text.secondary' }} />
                <Link
                  href="https://instagram.com/natures.crate"
                  target="_blank"
                  color="text.secondary"
                  sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' }, fontSize: '0.875rem' }}
                >
                  @natures.crate
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ mr: 0.5, fontSize: '1rem', color: 'text.secondary' }} />
                <Link
                  href="mailto:hello@naturescrate.com"
                  color="text.secondary"
                  sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' }, fontSize: '0.875rem' }}
                >
                  hello@naturescrate.com
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ mr: 0.5, fontSize: '1rem', color: 'text.secondary' }} />
                <Typography color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  +91 98765 43210
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          align="center" 
          sx={{ 
            display: 'block',
            mt: 1.5,
            pt: 1.5,
            borderTop: '1px solid #e0e0e0',
            fontSize: '0.75rem'
          }}
        >
          © {new Date().getFullYear()} Nature's Crate. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 