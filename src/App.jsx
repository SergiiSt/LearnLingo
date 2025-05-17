import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from './redux/auth/slice';
import { auth } from '../firebase/';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header/Header';
const HomePage = lazy(() => import('../src/pages/HomePage/HomePage'));
// const Favorites = lazy(() => import('../src/pages/Favorites/Favorites'));
const Teachers = lazy(() => import('../src/pages/Teachers/Teachers'));
// import Teachers from './pages/Teachers/Teachers';
import Loader from './components/Loader/Loader';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  const [authReady, setAuthReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const cleanUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
        };
        dispatch(login({ user: cleanUser }));
      }
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (!authReady) return <div> Checking session ...</div>;

  return (
    <>
      <Toaster />
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<Teachers />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
