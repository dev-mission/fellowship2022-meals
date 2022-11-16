import { map } from 'lodash';
import './About.scss';

function About() {
  const orgs = [
    {
      name: 'Dev/Mission',
      website: 'https://devmission.org/',
      logo: 'https://devmission.org/wp-content/uploads/2017/04/cropped-Dev-Mission-Icon-JPG-192x192.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Vel turpis nunc eget lorem. Mauris vitae ultricies leo integer malesuada nunc vel risus. In tellus integer feugiat scelerisque. ',
    },
    {
      name: 'Code for San Francisco',
      website: 'https://www.codeforsanfrancisco.org/',
      logo: 'https://pbs.twimg.com/profile_images/611647656331378688/Rf_FNiDA_400x400.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Vel turpis nunc eget lorem. Mauris vitae ultricies leo integer malesuada nunc vel risus. In tellus integer feugiat scelerisque. ',
    },
    {
      name: 'San Francisco Human Services Agency',
      website: 'https://www.sfhsa.org/',
      logo: 'https://yt3.ggpht.com/ytc/AMLnZu8qyUA3uNu9sSWNX0MqVg8EUKHn8PD5jKSH7-KhyQ=s900-c-k-c0x00ffffff-no-rj',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum fusce ut placerat orci nulla pellentesque dignissim enim. Vel turpis nunc eget lorem. Mauris vitae ultricies leo integer malesuada nunc vel risus. In tellus integer feugiat scelerisque. ',
    },
  ];

  return (
    <main className="about">
      <h1>About SF Ready Meals</h1>
      <div className="description">
        SFHSA's Congregate Meals Program offers nutritious, low-cost meals to seniors 60+ and adults with disabilities everyday at many
        community dining sites throughout the city. In response to COVID-19, most sites offer takeout meals.
      </div>
      <ul>
        {orgs.map((org) => {
          return (
            <li>
              <img src={org.logo}></img>
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
