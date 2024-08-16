import { AuthProvider, HttpError } from "react-admin";


/**
 * This authProvider is only for test purposes. Don't use it in production.
 */

const apiUrl=process.env.VITE_API_URL
export const authProvider: AuthProvider = {
  login: ({ email, password }) => {
    const request = new Request(`${apiUrl}/admin/login`, {
        method: 'POST',
        credentials:'include',
        body: JSON.stringify({ email, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
           
            if(response.status ===200){
                window.location.href='/account-security/otp-verification'
            }
        })
        
},
checkError: (error) => { /* ... */ },
checkAuth: () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
},
logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    return Promise.resolve();
},
getIdentity: () => { /* ... */ },
getPermissions: () => {
    const role = localStorage.getItem('permissions');
    return role ? Promise.resolve(role) : Promise.reject();
},
};

export default authProvider;
