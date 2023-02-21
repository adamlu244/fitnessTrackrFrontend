const PublicRoutinesList = ({routinesList}) => {

  return (
    <div>

      {
        routinesList.length > 0 ? 
          routinesList.map(routine => {
            return (
              <li key={routine.id}>
                <h2>Routine: {routine.name}</h2>
                <h3>User: {routine.creatorName}</h3>
                <h3>Goal: {routine.goal}</h3>
                {(routine.activities ?? []).map(activity => {
                  return (
                    <div key={activity.routineActivityId}>
                      <h3>Activity Name: {activity.name}</h3>
                      <h4>Description: {activity.description}</h4>
                      <h4>Duration: {activity.duration}</h4>
                      <h4>Count: {activity.count}</h4>
                    </div>
                  )
                })}
              </li>
            )
          }) : null
      }

    </div>
  )
}

export default PublicRoutinesList;