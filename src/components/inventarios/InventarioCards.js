import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {} from '../../services/inventarioService';


export const InventarioCards = (props) => {

  const { inventario } = props;

  console.log(props);

  return (
    <div className="col" >
      <div className="card">
        <img src={inventario.foto} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Caracteristicas</h5>
          <hr />
          <p className="card-text">{`Serial: ${inventario.serial}`}</p>
          <p className="card-text">{`Marca: ${inventario.marca.nombre}`}</p>
          <p className="card-text">{`Usuario: ${inventario.usuario.nombre}`}</p>
          <p className='cart-text'>
            <Link to={`inventarios/edit/${inventario._id}`}>Ver Mas....</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
