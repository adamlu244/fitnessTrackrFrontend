import { useState } from "react";
import { updateActivity } from "../utils/API";

const UpdateActivity = ({activitiesList, setActivitiesList, token, activityId}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitEditActivity(event) {
    try {
      event.preventDefault();

      if (!name && !description) {
        setErrorMessage("All fields must filled out to edit your activity")
      } else if (token) {
        setErrorMessage("");
        const activity = {
          name,
          description
        }

        setName("");
        setDescription("");

        const response = await updateActivity(activity, token, activityId);

        if (response.error) {
          setErrorMessage(`Activity with the name ${name} already exists`);
        } else {
          const filteredActivitiesList = activitiesList.filter(activity => activity.id !== activityId);
          setActivitiesList([...filteredActivitiesList, response]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>

      <p>{errorMessage}</p>

      <form onSubmit={submitEditActivity}>

        <label>New activity: </label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}>
        </input>

        <label>New description: </label>
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}>
        </input>

        <button type="submit">Edit Activity</button>

      </form>

    </div>
  )
}

export default UpdateActivity;