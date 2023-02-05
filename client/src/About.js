import './About.scss';

import { useTranslation } from 'react-i18next';
function About() {
  const { t } = useTranslation();

  const orgs = [
    {
      name: t('about.sfhsa.title'),
      website: 'https://www.sfhsa.org/',
      logo: 'sfhsa-logo.png',
      description: t('about.sfhsa.description'),
    },
    {
      name: t('about.devMission.title'),
      website: 'https://devmission.org/',
      logo: 'devmission.png',
      description: t('about.devMission.description'),
    },
    {
      name: t('about.c4sf.title'),
      website: 'https://www.codeforsanfrancisco.org/',
      logo: 'c4sf.png',
      description: t('about.c4sf.description'),
    },
  ];

  return (
    <main className="about">
      <h1>{t('about.title')}</h1>
      <div className="description"> {t('about.description')} </div>
      <ul>
        {orgs.map((org) => {
          return (
            <li key={org.name}>
              <img src={`${process.env.PUBLIC_URL}/${org.logo}`} alt={org.logo}></img>
              <div className="text">
                <a href={org.website} target="_blank" rel="noreferrer">
                  <h3>{org.name}</h3>
                </a>
                <p>{org.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default About;
