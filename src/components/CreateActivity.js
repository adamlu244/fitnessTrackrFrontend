import { useState } from "react";
import { createNewActivity } from "../utils/API";

const CreateActivity = ({activitiesList, setActivitiesList, token}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitNewActivity(event) {
    try {
      event.preventDefault();

      const activity = {
        name,
        description
      }

      const response = await createNewActivity(activity, token);

      if (!name && !description) {
        setErrorMessage("All fields must filled out to make a new activity")
      } else if (response.error) {
        setErrorMessage(`Activity with the name ${name} already exists`)
      } else {
          setActivitiesList([...activitiesList, response])
          setErrorMessage("");
          setName("");
          setDescription("");
        }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>

      <h2>New Activity</h2>

      <p>{errorMessage}</p>

      <form onSubmit={submitNewActivity}>

        <label>Name of activity: </label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}>
        </input>

        <label>Description: </label>
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}>
        </input>

        <button type="submit">Create New Activity</button>

      </form>

    </div>
  )
}

export default CreateActivity;