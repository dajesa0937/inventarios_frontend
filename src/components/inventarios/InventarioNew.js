
import React, { useState, useEffect } from 'react';
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTiposEquipos } from '../../services/tipoEquipoService';
import { getEstadosEquipos } from '../../services/estadoEquipoService';

export const InventarioNew = ({ handleOpenModal }) => {

  const [usuarios, setUsuarios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [valoresForm, setvaloresForm] = useState({});
  const { serial = '', modelo = '', descripcion = '', color = '', foto = '',
    fechaCompra = '', precio = '' } = valoresForm;

  useEffect(() => {
    const listarUsuarios = async () => {
      try {
        const { data } = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.log(error);
      }
    }
    listarUsuarios();

  }, []);

  useEffect(() => {
    const listarMarcas = async () => {
      try {
        const { data } = await getMarcas();
        setMarcas(data);
      } catch (error) {
        console.log(error);
      }
    }
    listarMarcas();

  }, []);

  useEffect(() => {
    const listarTipos = async () => {
      try {
        const { data } = await getTiposEquipos();
        setTipos(data);
      } catch (error) {
        console.log(error);
      }
    }
    listarTipos();

  }, []);


  useEffect(() => {
    const listarEstados = async () => {
      try {
        const { data } = await getEstadosEquipos();
        setEstados(data);
      } catch (error) {
        console.log(error);
      }
    }
    listarEstados();

  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setvaloresForm({ ...valoresForm, [name]: value })
  }

  return (
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>NUEVO INVENTARIO</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>

            </div>

          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr />

          </div>

        </div>

        <form>
          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input type="text" name='serial'
                  onChange={(e) => handleOnChange(e)}
                  value={serial}

                  className="form-control" />

              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Modelo</label>
                <input type="text" name='modelo'
                  onChange={(e) => handleOnChange(e)}
                  value={modelo}

                  className="form-control" />

              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Descripcion</label>
                <input type="text" name='descripcion'
                  onChange={(e) => handleOnChange(e)}
                  value={descripcion}

                  className="form-control" />

              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Color</label>
                <input type="text" name='color'
                  onChange={(e) => handleOnChange(e)}
                  value={color}

                  className="form-control" />

              </div>
            </div>

          </div>
          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Foto</label>
                <input type="url" name='foto'
                  onChange={(e) => handleOnChange(e)}
                  value={foto}

                  className="form-control" />

              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Fecha Compra</label>
                <input type="date" name='fechaCompra'
                  value={fechaCompra}
                  onChange={(e) => handleOnChange(e)}
                  className="form-control" />

              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input type="number" name='precio'
                  value={precio}
                  onChange={(e) => handleOnChange(e)}
                  className="form-control" />

              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input type="text" name='usuario' className="form-control" />
                <select className="form-select" >
                  <option value="">--SELECCIONAR</option>

                  {
                    usuarios.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }

                </select>

              </div>
            </div>

          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Marca</label>
                <select className="form-select" >
                  <option value="">--SELECCIONAR</option>

                  {
                    marcas.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }

                </select>

              </div>

            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Tipo Equipo</label>
                <select className="form-select" >
                  <option value="">--SELECCIONAR</option>

                  {
                    tipos.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }

                </select>

              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Estado Equipo</label>
                <select className="form-select" >
                  <option value="">--SELECCIONAR</option>

                  {
                    estados.map(({ _id, nombre }) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }

                </select>

              </div>
            </div>



          </div>

        </form>
      </div>
    </div>
  )
}
