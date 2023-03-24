import React from 'react';
import App from '..';
import NavigationBar from '../Components/NavigationBar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <NavigationBar />

      <App />
    </div>
  )
}
