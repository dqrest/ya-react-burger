import { CustomResponse } from '../../utils/api';

export const checkResponse = <T>(res: CustomResponse<T>) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};