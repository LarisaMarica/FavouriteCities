import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2C3E50' }}> {/* Dark blue background */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" passHref>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <Image src="/1.jpg" alt="Logo" width={40} height={40} />
            </Box>
          </Link>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white', // Logo title color
            }}
          >
            {/* Optionally, add some text or logo title */}
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/" passHref>
              <Button sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>Home</Button>
            </Link>
            <Link href="/search" passHref>
              <Button sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>Search</Button>
            </Link>
            <Link href="/city/1" passHref>
              <Button sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>City</Button>
            </Link>
            <Link href="/favourites" passHref>
              <Button sx={{ color: '#ECF0F1', '&:hover': { backgroundColor: '#34495E' } }}>Favourites</Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
