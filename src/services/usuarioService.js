import { axiosInstance } from '../helpers/axios-config';

const getUsuarios = () => {
    return axiosInstance.get('usuario', {
        headers: { 
            'Content-type': 'aplicatiom/json'
        }
    })
}

export {
    getUsuarios
}