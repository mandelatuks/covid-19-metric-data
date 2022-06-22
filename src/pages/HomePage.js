import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSearchLocation } from "react-icons/fa";
import fetchData from "../redux/covid/Api";
import { fetchStats } from "../redux/covid/reducer";

const HomePage = () => {
  const countryStore = useSelector((store) => store.details);
  const dispatch = useDispatch();

  useEffect(() => {
    if (countryStore.length === 0) {
      fetchData().then((response) => dispatch(fetchStats(response)));
    }
  }, [countryStore.length, dispatch]);

  let continCovid = countryStore.filter((item) => item.continent === "Europe");
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";
  continCovid = continCovid.filter((country) =>
    country.country.includes(search)
  );
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(search);

  const countryFilterOnChange = (event) => {
    navigate(event.target.value ? `?search=${event.target.value}` : "");
    setSearchValue(event.target.value);
  };

  return (
   
};

export default HomePage;
