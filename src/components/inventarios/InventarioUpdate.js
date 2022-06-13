import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getInventarioPorId, editInventario } from '../../services/inventarioService';

import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTiposEquipos } from '../../services/tipoEquipoService';
import { getEstadosEquipos } from '../../services/estadoEquipoService';
import Swal from 'sweetalert2';


export const InventarioUpdate = () => {
    const { inventarioId = '' } = useParams();
    console.log(inventarioId);
    const [inventario, setInventarios] = useState({});

    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [estados, setEstados] = useState([]);

    const [valoresForm, setvaloresForm] = useState({});
    const { serial = '', modelo = '', descripcion = '', color = '', foto = '',
        fechaCompra = '', precio = '', usuario, marca, tipo, estado } = valoresForm;

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

    const getInventario = async () => {

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
              });
              Swal.showLoading();

            const { data } = await getInventarioPorId(inventarioId);
            
            setInventarios(data)
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }

    }

    useEffect(() => {
        getInventario();
    }, [inventarioId]);

    useEffect(() => {
        setvaloresForm({
            serial: inventario.serial,
            modelo: inventario.modelo,
            descripcion: inventario.descripcion,
            color: inventario.color,
            foto: inventario.foto,
            fechaCompra: inventario.fechaCompra,
            precio: inventario.precio,
            usuario: inventario.usuario,
            marca: inventario.marca,
            tipo: inventario.tipoEquipo,
            estado: inventario.estadoEquipo,
        });

    }, [inventario]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setvaloresForm({ ...valoresForm, [name]: value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const inventario = {
            serial, modelo, descripcion, color, foto,
            fechaCompra, precio,
            usuario: {
                _id: usuario
            },

            marca: {
                _id: marca
            },

            tipoEquipo: {
                _id: tipo
            },

            estadoEquipo: {
                _id: estado
            },

        }

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await editInventario(inventarioId, inventario);
            

            Swal.close();

        } catch (error) {
            console.log(error);
            console.log(error.response.data);
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

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>DETALLE ACTIVO</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img className='img-fluid' src={inventario?.foto} />
                        </div>
                        <div className='col-md-8'>
                            <form onSubmit={(e) => handleOnSubmit(e)}>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Serial</label>
                                            <input type="text" name='serial'
                                                required
                                                onChange={(e) => handleOnChange(e)}
                                                value={serial}

                                                className="form-control" />

                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Modelo</label>
                                            <input type="text" name='modelo'
                                                required
                                                onChange={(e) => handleOnChange(e)}
                                                value={modelo}

                                                className="form-control" />

                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Descripcion</label>
                                            <input type="text" name='descripcion'
                                                required
                                                onChange={(e) => handleOnChange(e)}
                                                value={descripcion}

                                                className="form-control" />

                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Color</label>
                                            <input type="text" name='color'
                                                required
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
                                                required
                                                onChange={(e) => handleOnChange(e)}
                                                value={foto}

                                                className="form-control" />

                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Fecha Compra</label>
                                            <input type="date" name='fechaCompra'
                                                required
                                                value={fechaCompra}
                                                onChange={(e) => handleOnChange(e)}
                                                className="form-control" />

                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Precio</label>
                                            <input type="number" name='precio'
                                                required
                                                value={precio}
                                                onChange={(e) => handleOnChange(e)}
                                                className="form-control" />

                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Usuario</label>
                                            <select className="form-select"
                                                required
                                                onChange={(e) => handleOnChange(e)}
                                                name='usuario'
                                                value={usuario}>
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
                                            <select className="form-select"
                                                required
                                                onChange={(e) => handleOnChange(e)}
                                                name='marca'
                                                value={marca}>
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
                                            <select className="form-select"
                                                required
                                                onChange={(e) => handleOnChange(e)}
                                                name='tipo'
                                                value={tipo}>
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
                                            <select className="form-select"
                                                required
                                                onChange={(e) => handleOnChange(e)}
                                                name='estado'
                                                value={estado}>
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

                                <div className='row'>
                                    <div className='col'>
                                        <button className='btn btn-primary'>GUARDAR</button>

                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
