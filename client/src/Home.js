import './Home.scss';
import Sites from './Sites/Sites';

import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <main className="home">
      <h1>{t('home.title')}</h1>
      <div className="description">{t('home.description')}</div>
      <h2>Check Your Eligibility</h2>
      <div className="survey-container">
        <div className="question-text">Are you an adult with disabilities?</div>
        <div className="button-container">
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
      <Sites />
    </main>
  );
}

export default Home;
