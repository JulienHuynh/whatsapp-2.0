export default function useGetUsers(authToken) {
    return async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            mode: "cors",
        });

        return await response.json();
    };
}
