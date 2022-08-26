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
