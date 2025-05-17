import { useState, useEffect } from 'react';
import { ref, child, get } from 'firebase/database';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

import Teacher from '../Teacher/Teacher';

export default function TeachersList() {
  const user = useSelector(state => state.auth.user);

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(() => {
    const stored = localStorage.getItem('favorite-list');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorite-list', JSON.stringify(favorite));
  }, [favorite]);

  const toggleFavorite = id => {
    !user
      ? toast('You need to be logged in!')
      : setFavorite(prev =>
          prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
  };

  useEffect(() => {
    const getTeachers = async () => {
      setLoading(true);
      const dbRef = ref(db);
      try {
        const snapshot = await get(child(dbRef, 'teachers'));
        if (snapshot.exists()) {
          const teachersData = Object.entries(snapshot.val()).map(
            ([key, value]) => ({
              id: key,
              ...value,
            })
          );

          setTeachers(teachersData);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        setError(`Failed to fetch teachers data ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    getTeachers();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (teachers.length === 0) {
    return <div>No teachers found</div>;
  }

  return (
    <div>
      <Toaster />
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id}>
            <Teacher
              teacher={teacher}
              isFavorite={favorite.includes(teacher.id)}
              toggle={() => toggleFavorite(teacher.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
