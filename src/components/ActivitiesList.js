import UpdateActivity from "./UpdateActivity"

const ActivitiesList = ({activitiesList, setActivitiesList, token}) => {

  return (
    <div>

      {
        activitiesList.length > 0 ?
          activitiesList.map(activity => {
            return (
              <li key={activity.id}>
                <h2>Activity: {activity.name}</h2>
                <h3>Description: "{activity.description}"</h3>
                <h3>
                 {token ? <UpdateActivity activity={activity} activitiesList={activitiesList} setActivitiesList={setActivitiesList} token={token} activityId={activity.id}/> : null}
                </h3>
              </li>
            )
          }) : null
      }

    </div>
  )
}

export default ActivitiesList