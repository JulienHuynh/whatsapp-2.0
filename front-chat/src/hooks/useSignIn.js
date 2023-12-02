import Cookies from 'js-cookie';

export default function useSignIn(userCredentials) {

    return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        mode: "cors",
        body: JSON.stringify(userCredentials),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(data => data.json())
        .then(response => {
            if (response.token) {
                Cookies.set('authToken', response.token, { expires: 1 / 24 });
            }
            return response;
        });
}
