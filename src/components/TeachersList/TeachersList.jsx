import { useState, useEffect } from 'react';
import { ref, child, get } from 'firebase/database';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

import css from '../TeachersList/TeachersList.module.css';

import Teacher from '../Teacher/Teacher';

export default function TeachersList() {
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    document.body.style.backgroundColor = '#eee';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

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
      ? toast('You need to be logged in!', { duration: 5000 })
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

  const languages = [...new Set(teachers.flatMap(t => t.languages))];
  const levels = [...new Set(teachers.flatMap(t => t.levels))];

  const filteredTeachers = teachers.filter(
    teacher =>
      (selectedLanguage === '' ||
        teacher.languages.includes(selectedLanguage)) &&
      (selectedLevel === '' || teacher.levels.includes(selectedLevel)) &&
      (selectedPrice === '' || teacher.price_per_hour <= Number(selectedPrice))
  );

  const langChange = e => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <>
      {!user ? null : (
        <div className={css.filters}>
          <div className={css.filter}>
            <label htmlFor="Languages" className={css.label}>
              Languages
            </label>
            <select
              value={selectedLanguage}
              className={css.select}
              onChange={langChange}
            >
              <option value="">All</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div className={css.filter}>
            <label htmlFor="Level of knowledge" className={css.label}>
              Level of knowledge
            </label>
            <select
              value={selectedLevel}
              className={css.select}
              onChange={e => setSelectedLevel(e.target.value)}
            >
              <option value="">All</option>
              {levels.map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className={css.filter}>
            <label htmlFor="Price" className={css.label}>
              Price
            </label>
            <select
              value={selectedPrice}
              className={`${css.select} ${css.selectPrice}`}
              onChange={e => setSelectedPrice(e.target.value)}
            >
              <option value="">All</option>
              <option value="10">10 $</option>
              <option value="20">20 $</option>
              <option value="30">30 $</option>
              <option value="40">40 $</option>
              <option value="50">50 $</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <Toaster />
        <ul>
          {filteredTeachers.map(teacher => (
            <li key={teacher.id}>
              <Teacher
                level={selectedLevel}
                teacher={teacher}
                isFavorite={favorite.includes(teacher.id)}
                toggle={() => toggleFavorite(teacher.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
