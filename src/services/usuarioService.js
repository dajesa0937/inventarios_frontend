import { axiosInstance } from '../helpers/axios-config';

const getUsuarios = () => {
    return axiosInstance.get('usuario', {
        headers: { 
            'Content-type': 'aplicatiom/json'
        }
    })
}

const crearUsuarios = (data) => {
    return  axiosInstance.post('usuario', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });

}

const editarUsuarios = (usuarioId, data) => {
    return  axiosInstance.put(`usuarios/${usuarioId}` , data, {
        headers: {
            'Content-type': 'application/json'
        }
    });


}

export {
    getUsuarios, crearUsuarios, editarUsuarios
}

