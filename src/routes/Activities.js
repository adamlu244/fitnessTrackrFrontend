import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ActivitiesList from "../components/ActivitiesList";
import CreateActivity from "../components/CreateActivity";
import { fetchAllActivities } from "../utils/API";

const Activities = () => {
  const [activitiesList, setActivitiesList] = useState([]);
  const [token] = useOutletContext();

  useEffect(() => {
    try {
      fetchAllActivities(token).then((results) => {
        setActivitiesList(results);
      })
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>

      <h1>Activities</h1>

      {token ? <CreateActivity activitiesList={activitiesList} setActivitiesList={setActivitiesList} token={token} /> : null}

      <ul>
        <ActivitiesList activitiesList={activitiesList} setActivitiesList={setActivitiesList} token={token} />
      </ul>

    </div>
  )
};

export default Activities;