import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import PublicRoutinesList from "../components/PublicRoutinesList";
import { fetchAllPublicRoutines } from "../utils/API";

const Routines = () => {
  const [routinesList, setRoutinesList] = useState([]);
  const [token] = useOutletContext();

  useEffect(() => {
    try {
      fetchAllPublicRoutines(token).then((results) => {
        setRoutinesList(results);
      })
    } catch (error) {
      console.error(error);
    }
  }, [token])

  return (
    <div>

      <h1>Routines</h1>

      <ul>
        <PublicRoutinesList routinesList={routinesList} setRoutinesList={setRoutinesList} token={token} />
      </ul>

    </div>
  )
};

export default Routines;