import { useState, useEffect } from 'react';
import { ref, child, get } from 'firebase/database';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

import Teacher from '../Teacher/Teacher';

export default function TeachersList() {
  const user = useSelector(state => state.auth.user);

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTeachers = async () => {
      if (!user || !user.uid) {
        // console.error('User is not logged in');
        setError('You must be logged in to view teachers');
        return;
      }
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
        // console.error('Error fetching teachers:', error.message);
        setError('Failed to fetch teachers data');
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
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id}>
            <Teacher teacher={teacher} />
          </li>
        ))}
      </ul>
    </div>
  );
}
