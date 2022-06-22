import axios from 'axios';

const baseUrl = 'https://disease.sh/v3/covid-19/countries';

const fetchData = async () => {
  const stats = [];
  const response = await axios.get(baseUrl);
  const responseStat = response.data;

  responseStat.map(({ countryInfo: { _id: id, flag }, ...data }) => {
    const staticsCovid = {
      continent: data.continent,
      country: data.country,
      country_id: id,
      country_flag: flag,
      total_cases: data.cases,
      total_deaths: data.deaths,
      total_recovered: data.recovered,
      total_active: data.active,
      total_tests: data.tests,
      population: data.population,
      todays_cases: data.todayCases,
      todays_deaths: data.todayDeaths,
      todays_recovered: data.todayRecovered,
    };
    return stats.push(staticsCovid);
  });
  return stats;
};

export default fetchData;
