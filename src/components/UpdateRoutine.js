import { useState } from "react";
import { updateRoutine } from "../utils/API";

const UpdateRoutine = ({routinesList, setRoutinesList, token, routineId}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitEditRoutine(event) {
    try {
      event.preventDefault();

      if (!name && !goal) {
        setErrorMessage("All fields must be filled out to edit your routine");
      } else {
        setErrorMessage("");
        const routine = {
          name,
          goal
        }

        setName("");
        setGoal("");

        const response = await updateRoutine(routine, token, routineId);

        if (response.error) {
          setErrorMessage(`Routine with the name ${name} already exists`);
        } else {
          const filteredRoutinesList = routinesList.filter(routine => routine.id !== routineId);
          setRoutinesList([...filteredRoutinesList, response]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>

      <p>{errorMessage}</p>

      <form onSubmit={submitEditRoutine}>

        <label>New routine: </label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}>
        </input>

        <label>New goal: </label>
        <input
          type="text"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}>
        </input>

        <button type="submit">Edit Activity</button>

      </form>

    </div>
  )
}

export default UpdateRoutine;