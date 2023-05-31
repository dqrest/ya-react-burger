import { CustomResponse, TResponseBody } from '../../utils/api';

export const NORMA_API = "https://norma.nomoreparties.space/api";

export const checkResponse = <T>(res: CustomResponse<T>) => {        
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// создаем функцию проверки на `success`
const checkSuccess =  <TK extends string = '', TD = {}>(res: TResponseBody<TK, TD>) => {    
    if (res && res.success) {
        return res;
    }    
    return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = <TK extends string = '', TD = {}>(endpoint: string, options: any) => {
    // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
    return fetch(`${NORMA_API}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess<TK, TD>);
};
