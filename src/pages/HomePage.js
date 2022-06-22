import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSearchLocation } from 'react-icons/fa';
import fetchData from '../redux/covid/Api';
import { fetchStats } from '../redux/covid/reducer';

const HomePage = () => {
  const countryStore = useSelector((store) => store.details);
  const dispatch = useDispatch();

  useEffect(() => {
    if (countryStore.length === 0) {
      fetchData().then((response) => dispatch(fetchStats(response)));
    }
  }, [countryStore.length, dispatch]);

  let continCovid = countryStore.filter((item) => item.continent === 'Europe');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get('search') || '';
  continCovid = continCovid.filter((country) => country.country.includes(search));
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(search);

  const countryFilterOnChange = (event) => {
    navigate(event.target.value ? `?search=${event.target.value}` : '');
    setSearchValue(event.target.value);
  };

  return (
    <div className="pages">
      <h1 className="area"> Europe</h1>
      <form className="form">
        <div className="search-bar">
          <FaSearchLocation />
          <div>
            <input
              className="input-area"
              type="text"
              value={searchValue}
              placeholder="Search Here"
              onChange={countryFilterOnChange}
            />
          </div>
        </div>
      </form>
      <ul className="list-country">
        {continCovid.map((country) => (
          <Link
            key={country.country}
            to={{ pathname: `/country/${country.country}` }}
          >
            <li className="list-details">
              <div className=" details">
                <h1 className="name">{country.country}</h1>
              </div>
              <div>
                <h2 className="pupalution">Population:</h2>
                {' '}
                <p className="number">{country.population.toLocaleString()}</p>
              </div>
              <div className="photo">
                <img
                  src={country.country_flag}
                  alt="national flag"
                  className="national-flag"
                />
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
