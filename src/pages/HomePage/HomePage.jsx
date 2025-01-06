import MainInfo from '../../components/MainInfo/MainInfo';
import MainPicture from '../../components/MainPicture/MainPicture';
import MainStats from '../../components/MainStats/MainStats';
import css from '../HomePage/HomePage.module.css';

export default function HomePage() {
  return (
    <main className={`${css.main} container`}>
      <MainInfo />
      <MainPicture />
      <MainStats />
    </main>
  );
}
