import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header/Header';
const HomePage = lazy(() => import('../src/pages/HomePage/HomePage'));
const Favorites = lazy(() => import('../src/pages/Favorites/Favorites'));
const Teachers = lazy(() => import('../src/pages/Teachers/Teachers'));
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<Teachers />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
