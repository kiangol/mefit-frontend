import React from 'react';
import withKeycloak from "../../hoc/withKeycloak";


const PreviousGoals = ({goals}) => {



    return (
       <>
           {goals && (
               [...goals].map((goal) => (
                   <>
                       <h3>Goal ended: {goal.endDate}</h3>
                   </>
               ))
           )}
       </>
    )
}

export default withKeycloak(PreviousGoals);