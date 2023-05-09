export const checkResponse = (res) => {
    //debugger;
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};