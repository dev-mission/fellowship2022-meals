import './Home.scss';
import Sites from './Sites/Sites';

function Home() {
  return (
    <main className="home">
      <h1>SF Ready Meals</h1>
      <div className="description">
        SFHSA's Congregate Meals Program offers nutritious, low-cost meals to seniors 60+ and adults with disabilities everyday at many
        community dining sites throughout the city. In response to COVID-19, most sites offer takeout meals.
      </div>
      <Sites />
    </main>
  );
}

export default Home;
