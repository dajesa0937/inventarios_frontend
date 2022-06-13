import { axiosInstance } from '../helpers/axios-config';

const getEstadosEquipos = () => {
    return axiosInstance.get('estado-equipo', {
        headers: { 
            'Content-type': 'aplicatiom/json'
        }
    })
}

const crearEstadosEquipos = (data) => {
    return  axiosInstance.post('estado-equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });

}

const editarEstadosEquipos = (estadoId, data) => {
    return  axiosInstance.put(`estados/${estadoId}` , data, {
        headers: {
            'Content-type': 'application/json'
        }
    });


}

export {
    getEstadosEquipos, crearEstadosEquipos, editarEstadosEquipos
}



