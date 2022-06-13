import React from 'react'

export const TipoTable = (props) => {
    const { tipos } = props;
    
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
        tipos.map(tipoEquipo => {
          return <tr key={tipoEquipo._id}>
            <th >{tipoEquipo.nombre}</th>
            <td>{tipoEquipo.estado}</td>

          </tr>
        })
      }


    </tbody>
  </table>


)
}

 
