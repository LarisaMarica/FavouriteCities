import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText, Button } from '@mui/material';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async (event) => {
    if (event.key === 'Enter' && query.trim() !== '') {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}&language=en&count=5`
        );
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>Search for a city from around the world</h1>
        <br />
        <TextField
          label="Enter a city name"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
        {results.length > 0 && (
          <List style={{ marginTop: '20px' }}>
            {results.map((city, index) => (
              <ListItem
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  borderRadius: '8px',
                  margin: '10px 0',
                  padding: '10px 15px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <ListItemText
                  primary={city.name}
                  secondary={city.country}
                  primaryTypographyProps={{ style: { color: '#ffffff', fontWeight: 'bold' } }}
                  secondaryTypographyProps={{ style: { color: '#cccccc' } }}
                />
                <Button
                  onClick={() => router.push(`/city/${encodeURIComponent(city.name)}`)}
                  style={{ color: '#4dabf5', marginLeft: '15px' }}
                >
                  View City
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </>
  );
}
