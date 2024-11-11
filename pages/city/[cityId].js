import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

const sampleCityData = {
  1: {
    name: 'Sample City',
    population: '500,000',
    country: 'Example Country',
  },
};

export default function CityPage() {
  const router = useRouter();
  const { cityId } = router.query;

  const city = sampleCityData[cityId];

  if (!city) {
    return (
      <>
        <Navbar />
        <div style={{ padding: '20px' }}>
          <h1>City not found</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>City: {city.name}</h1>
        <p>Population: {city.population}</p>
        <p>Country: {city.country}</p>
      </div>
    </>
  );
}
