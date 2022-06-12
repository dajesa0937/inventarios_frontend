import { axiosInstance } from '../helpers/axios-config';

const getMarcas = () => {
    return axiosInstance.get('marca', {
        headers: { 
            'Content-type': 'aplicatiom/json'
        }
    })
}

export {
    getMarcas
}