import React, { useState, useEffect } from 'react'
import { getUsuarios, crearUsuarios, editarUsuarios } from '../../services/usuarioService';
import {UsuarioTable} from './UsuarioTable';
import Swal from  'sweetalert2';

export const UsuarioView = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [valoresForm, setvaloresForm] = useState({});
  const { nombre = '', email = '', estado = '' } = valoresForm;

  const listarUsuarios = async () => {
    try {
      const resp = await getUsuarios();
      console.log(resp.data);
      setUsuarios(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnChange = (e) => {
    setvaloresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const nuevoUsuario = async (usuario) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text:'Cargando...'
      });
       Swal.showLoading();
      const resp = await crearUsuarios(usuario);
      console.log(resp.data);
      listarUsuarios();
      setvaloresForm({ nombre: '', email:'', estado: '' })
      
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

  const handleCrearUsuario = (e) => {
    e.preventDefault();
    nuevoUsuario(valoresForm);
  }

  useEffect(() => { listarUsuarios() }, []);

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearUsuario(e)}>

        <legend>CREAR / EDITAR TIPO USUARIOS</legend>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input name='nombre' value={nombre} type="text" className="form-control"
            placeholder="Ingresar Nombre" onChange={(e) => handleOnChange(e)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name='email' value={email} type="text" className="form-control"
            placeholder="Ingresar Email" onChange={(e) => handleOnChange(e)} />
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

      <UsuarioTable usuarios={usuarios} />
      
      </div>
      )
    }