import { deleteRoutine } from "../utils/API";

const DeleteRoutine = ({routine, routinesList, setRoutinesList, token}) => {

  async function handleDeleteRoutine () {
    const response = await deleteRoutine(routine.id, token);

    const filteredRoutinesList = routinesList.filter(filteredRoutine => filteredRoutine.id !== response.id);

    setRoutinesList(filteredRoutinesList);

  }

  return (
    <div>

      <button 
        onClick={(event) => {
          event.preventDefault();
          handleDeleteRoutine();
        }}
      >
        Delete Routine
      </button>

    </div>
  )
}

export default DeleteRoutine;