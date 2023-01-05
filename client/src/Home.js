import './Home.scss';
import Sites from './Sites/Sites';

import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <main className="home">
      <h1>{t('home.title')}</h1>
      <div className="description">{t('home.description')}</div>
      <Sites />
    </main>
  );
}

export default Home;
