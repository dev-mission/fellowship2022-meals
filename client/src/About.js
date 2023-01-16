import { map } from 'lodash';
import './About.scss';

function About() {
  const orgs = [
    {
      name: 'San Francisco Human Services Agency',
      website: 'https://www.sfhsa.org/',
      logo: 'sfhsa-logo.png',
      description:
        'San Francisco Human Services Agency supports individuals, families, and communities with food, health care, financial, employment, child care, and protective services.',
    },
    {
      name: 'Dev/Mission',
      website: 'https://devmission.org/',
      logo: 'devmission.png',
      description:
        'Dev/Mission has been connecting more than 260 low-income young adults to careers in Tech through post-secondary STEM careers and jobs in the tech industry as well as exposing K-12 to STEAM Activities. Dev/Mission provides STEM opportunities for untapped 6-24 year-olds San Francisco Bay Area youth. Our goal is to connect underserved populations to careers in technology by teaching programming, hardware, and critical career skills.',
    },
    {
      name: 'Code for San Francisco',
      website: 'https://www.codeforsanfrancisco.org/',
      logo: 'c4sf.png',
      description:
        'Code for San Francisco is part of the Code for America Brigade Network. We are a welcoming and inclusive volunteer group of developers, designers, data geeks, and citizen activists who use creative technology to solve civic and social problems.',
    },
  ];

  return (
    <main className="about">
      <h1>About SF Ready Meals</h1>
      <div className="description">
        This congregate program serves nutritious meals at community dining centers across the City. Note: Due to COVID, many dining centers
        may provide take-out meals only, or as an option with limited communal dining. This website is a collaboration of SFHSA, Dev/Mission
        and Code for San Francisco.
      </div>
      <ul>
        {orgs.map((org) => {
          return (
            <li>
              <img src={`${process.env.PUBLIC_URL}/${org.logo}`}></img>
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
