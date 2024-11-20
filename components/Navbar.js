import { useSession, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const isActive = (path) => router.pathname === path;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" passHref>
            <Box
              sx={{
                display: { xs: 'flex', md: 'flex' },
                alignItems: 'center',
                color: 'white',
                mr: 2,
              }}
            >
              <LocalAirportIcon fontSize="large" />
              <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                Travel App
              </Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/" passHref>
              <Button
                sx={{
                  color: isActive('/') ? '#FFD700' : '#ECF0F1',
                  '&:hover': { backgroundColor: '#34495E' },
                }}
              >
                Home
              </Button>
            </Link>
            <Link href="/search" passHref>
              <Button
                sx={{
                  color: isActive('/search') ? '#FFD700' : '#ECF0F1',
                  '&:hover': { backgroundColor: '#34495E' },
                }}
              >
                Search
              </Button>
            </Link>
            <Link href="/city/1" passHref>
              <Button
                sx={{
                  color: isActive('/city') ? '#FFD700' : '#ECF0F1',
                  '&:hover': { backgroundColor: '#34495E' },
                }}
              >
                City
              </Button>
            </Link>
            <Link href="/favourites" passHref>
              <Button
                sx={{
                  color: isActive('/favourites') ? '#FFD700' : '#ECF0F1',
                  '&:hover': { backgroundColor: '#34495E' },
                }}
              >
                Favourites
              </Button>
            </Link>
            {!session ? (
              <Link href="/auth/signin" passHref>
                <Button
                  sx={{
                    color: '#ECF0F1',
                    '&:hover': { backgroundColor: '#34495E' },
                  }}
                >
                  Sign In
                </Button>
              </Link>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 2,  // adds space between menu items and avatar
                }}
              >
                <Avatar
                  sx={{
                    cursor: 'pointer',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    // Add margin to give a little space between the avatar and menu
                    marginLeft: 2,
                  }}
                  onClick={handleMenuOpen}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem disabled>{session.user.name}</MenuItem>
                  <MenuItem disabled>{session.user.email}</MenuItem>
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
