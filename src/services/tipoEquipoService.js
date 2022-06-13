import { axiosInstance } from '../helpers/axios-config';


const getTiposEquipos = () => {
    return  axiosInstance.get('tipo-equipo', {
        headers: {
            'Content-type': 'application/json'
        }
    });

}

const crearTiposEquipos = (data) => {
    return  axiosInstance.post('tipo-equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });

}

const editarTiposEquipos = (tipoId, data) => {
    return  axiosInstance.put(`tipos/${tipoId}` , data, {
        headers: {
            'Content-type': 'application/json'
        }
    });


}

export {
    getTiposEquipos, crearTiposEquipos, editarTiposEquipos
}



