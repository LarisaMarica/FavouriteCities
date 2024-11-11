import React from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>This is the Home page</h1>
      </div>
    </>
  );
}
