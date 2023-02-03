import './Home.scss';
import Sites from './Sites/Sites';

function Home() {
  return (
    <main className="home">
      <h1>SF Ready Meals</h1>
      <div className="description">
        The San Francisco Human Services Agency's Congregate Meals Program offers nutritious, low-cost meals to seniors 60+ and adults with
        disabilities between the ages of 18 and 59, everyday at many community dining sites throughout the city.
      </div>
      <Sites />
    </main>
  );
}

export default Home;
