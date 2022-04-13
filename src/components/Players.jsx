import React from 'react'
import '../App.css'; 

function Players({name,score}) {
  return (
    <div className='playerTable'>

        <table>
        <tr>
            <th>Name</th>
            <th>Score</th>
        </tr>
        <tr>
            <td>{name}</td>
            <td>{score}</td>
        </tr>
        </table>
    </div>
  )
}

export default Players