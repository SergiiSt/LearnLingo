// import { onAuthStateChanged } from 'firebase/auth';
// import { useDispatch } from 'react-redux';
// import { login } from './redux/auth/slice';
// import { auth } from '../firebase/';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header/Header';
const HomePage = lazy(() => import('../src/pages/HomePage/HomePage'));
// const Favorites = lazy(() => import('../src/pages/Favorites/Favorites'));
const Teachers = lazy(() => import('../src/pages/Teachers/Teachers'));
const AdminPage = lazy(() => import('../src/pages/AdminPage/AdminPage'));
// import Teachers from './pages/Teachers/Teachers';
import Loader from './components/Loader/Loader';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const [authReady, setAuthReady] = useState(false);
  // const dispatch = useDispatch();
  const reduxAuth = useSelector(state => state.auth);

  useEffect(() => {}, [reduxAuth]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, user => {
  //     if (user) {
  //       const cleanUser = {
  //         uid: user.uid,
  //         email: user.email,
  //       };
  //       dispatch(login({ user: cleanUser }));
  //     }
  //     setAuthReady(true);
  //   });
  //   return () => unsubscribe();
  // }, [dispatch]);
  useEffect(() => {
    setAuthReady(true);
  }, []);
  if (!authReady) return <div> Checking session ...</div>;

  return (
    <>
      <Toaster />
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
