import React from 'react'

export const EstadoTable = (props) => {
    const { estados } = props;
    
  return (
    <table className="table">
    <thead>
      <tr>

        <th >Nombre</th>
        <th >Estado</th>

      </tr>
    </thead>
    <tbody>
      {
        estados.map(estadoEquipo => {
          return <tr key={estadoEquipo._id}>
            <th >{estadoEquipo.nombre}</th>
            <td>{estadoEquipo.estado}</td>

          </tr>
        })
      }


    </tbody>
  </table>


)
}

 
