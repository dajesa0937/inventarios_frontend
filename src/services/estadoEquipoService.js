import { axiosInstance } from '../helpers/axios-config';

const getEstadosEquipos = () => {
    return axiosInstance.get('estado-equipo', {
        headers: { 
            'Content-type': 'aplicatiom/json'
        }
    })
}

export {
    getEstadosEquipos
}