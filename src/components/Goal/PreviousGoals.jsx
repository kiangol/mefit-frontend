import React from 'react';
import withKeycloak from "../../hoc/withKeycloak";


const PreviousGoals = ({goals}) => {



    return (
       <>
           <h1>Previous goals</h1>
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