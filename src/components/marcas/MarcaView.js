import React, { useState, useEffect } from 'react'
import { getMarcas, crearMarca, editarMarca } from '../../services/marcaService';
import {MarcaTable} from './MarcaTable';

export const MarcaView = () => {
  const [marcas, setMarcas] = useState([]);
  const [valoresForm, setvaloresForm] = useState({});
  const { nombre = '', estado = '' } = valoresForm;

  const listarMarcas = async () => {
    try {
      const resp = await getMarcas();
      console.log(resp.data);
      setMarcas(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnChange = (e) => {
    setvaloresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const nuevaMarca = async (marca) => {
    try {
      const resp = await crearMarca(marca);
      console.log(resp.data);
      listarMarcas();
      setvaloresForm({ nombre: '', estado: '' })
    } catch (error) {
      console.log(error);
    }
  }

  const handleCrearMarca = (e) => {
    e.preventDefault();
    nuevaMarca(valoresForm);
  }

  useEffect(() => { listarMarcas() }, []);

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearMarca(e)}>

        <legend>CREAR / EDITAR MARCA</legend>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input name='nombre' value={nombre} type="text" className="form-control"
            placeholder="Ingresar Nombre" onChange={(e) => handleOnChange(e)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select name='estado' value={estado} className="form-select" onChange={(e) => handleOnChange(e)}>
            <option defaultValue="">Seleccionar Una Opcion</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>

          </select>
        </div>

        <button className="btn btn-primary">GUARDAR</button>

      </form>

      <MarcaTable marcas={marcas} />
      
      </div>
      )
    }