import React, { useState, useEffect } from 'react'
import { getEstadosEquipos, crearEstadosEquipos, editarEstadosEquipos } from '../../services/estadoEquipoService';
import {EstadoTable} from './EstadoTable';
import Swal from  'sweetalert2';

export const EstadoView = () => {
  const [estados, setEstados] = useState([]);
  const [valoresForm, setvaloresForm] = useState({});
  const { nombre = '', estado = '' } = valoresForm;

  const listarEstados = async () => {
    try {
      const resp = await getEstadosEquipos();
      console.log(resp.data);
      setEstados(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnChange = (e) => {
    setvaloresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const nuevoEstado = async (marca) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text:'Cargando...'
      });
       Swal.showLoading();
      const resp = await crearEstadosEquipos(marca);
      console.log(resp.data);
      listarEstados();
      setvaloresForm({ nombre: '', estado: '' })
      
      Swal.close();

    } catch (error) {  
      console.log(error);

      Swal.close();
        let mensaje;
        if (error && error.reponse && error.reponse.data){
            mensaje = error.reponse.data;
        }else{
            mensaje = 'Ocurrio un error, INTENTE DE NUEVO';
        }
        Swal.fire('Error', mensaje, 'error');
    }
  }

  const handleCrearEstado = (e) => {
    e.preventDefault();
    nuevoEstado(valoresForm);
  }

  useEffect(() => { listarEstados() }, []);

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearEstado(e)}>

        <legend>CREAR / EDITAR TIPO ESTADOS</legend>
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

      <EstadoTable estados={estados} />
      
      </div>
      )
    }