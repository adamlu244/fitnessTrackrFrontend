import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchUsersPublicRoutines } from "../utils/API";
import CreateRoutine from "../components/CreateRoutine";
import DeleteRoutine from "../components/DeleteRoutine";
import UpdateRoutine from "../components/UpdateRoutine";

const Profile = () => {
  const [routines, setRoutines] = useState([]);
  const [token] = useOutletContext();
  const { username } = jwtDecode(token);
 
  useEffect(() => {
    try {
      fetchUsersPublicRoutines(username).then((results) => {
        setRoutines(results);
      })
    } catch (error) {
      console.error(error);
    } 
  }, [username])


  return (
    <div>

      <h1>Welcome {username}</h1>

      <div>
        <h2>Your Routines</h2>

        {token ? <CreateRoutine routines={routines} setRoutines={setRoutines} token={token} /> : null}

        <ul>
          {
            routines.length > 0 ? 
              routines.map(routine => {
                return (
                  <li key={routine.id}>
                    <h3>Routine: {routine.name}</h3>
                    <h3>Goal: {routine.goal}</h3>
                    <UpdateRoutine routineId={routine.id} routine={routine} routinesList={routines} setRoutinesList={setRoutines} token={token}/>
                    {(routine.activities ?? []).map(activity => {
                      return (
                        <div>
                          <h3>Activity Name: {activity.name}</h3>
                          <h4>Description: {activity.description}</h4>
                          <h4>Duration: {activity.duration}</h4>
                          <h4>Count: {activity.count}</h4>
                        </div>
                      )
                    })}
                    <DeleteRoutine routine={routine} routinesList={routines} setRoutinesList={setRoutines} token={token}/>
                  </li>
                )
              }) : null
          }
        </ul>
      </div>

    </div>
  )
};

export default Profile;