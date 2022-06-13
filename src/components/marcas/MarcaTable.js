import React from 'react'

export const MarcaTable = (props) => {
    const { marcas } = props;
    
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
        marcas.map(marca => {
          return <tr key={marca._id}>
            <th >{marca.nombre}</th>
            <td>{marca.estado}</td>

          </tr>
        })
      }


    </tbody>
  </table>


)
}

 
