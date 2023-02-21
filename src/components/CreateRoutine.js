import { useState } from "react"
import { createNewRoutine } from "../utils/API";

// NOTE: When you create the routine in your profile page, and then navigate to the routines page, 
// the routine won't be generated at the bottom, but somewhere near the bottom for some reason,
// but still works as it should.

const CreateRoutine = ({routines, setRoutines, token}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  async function submitNewRoutine(event) {
    try {
      event.preventDefault();

      if (!name && !goal) {
        setErrorMessage("All fields must filled out to make a new routine")
      } else if (token) {
        setErrorMessage("");
        setIsPublic(true);
        const routine = {
          name,
          goal,
          isPublic
        }

        setName("");
        setGoal("");

        const response = await createNewRoutine(routine, token);

        if (response.error) {
          setErrorMessage(`Routine with the name ${name} already exists`);
        } else {
          setRoutines([...routines, response])
        }
      }
    } catch (error) {
      console.error(error);
    }    
  }

  return (
    <div>

      <h2>New Routine</h2>

      <p>{errorMessage}</p>

      <form onSubmit={submitNewRoutine}>

        <label>Name of routine: </label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}>
        </input>

        <label>Goal: </label>
        <input
          type="text"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}>
        </input>

        <button type="submit">Create New Routine</button>

      </form>

    </div>
  )
}

export default CreateRoutine;
