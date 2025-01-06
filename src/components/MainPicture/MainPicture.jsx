import HeroPic from '../../assets/img/HeroPic.jpg';
import css from '../MainPicture/MainPicture.module.css';

export default function MainPicture() {
  return (
    <section className={css.picSection}>
      <img src={HeroPic} alt="" className={css.pic} />
    </section>
  );
}
