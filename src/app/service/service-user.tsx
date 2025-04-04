const baseURL = 'http://localhost:3200';

export const fetchDataUser = async (id: string) => {
    console.log('fetchDataUser', id) 
    const url = `${baseURL}/user/${id}`;
    const options = {
        method: 'GET',
        // headers: { 'Authorization': bearerToken }
    };

    try {
        const response: any = await fetch(url, options);
        const data = await response.json();

        data.favoriteChampionship = JSON.parse(data.favoriteChampionship);


        console.log( 'fetchuser', data);
        return data;
    } catch (error) {
        throw new Error(`Usuário não encontrado: ${error}`);
    }
};

export const updateDataUser = async (user: any) => { 
    const url = `${baseURL}/user`;
    const body = {
        id: user.id,
        name: user.name,
        login: user.login,
        favoriteChampionship: user.favoriteChampionship
    };
    
    const options = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
          }
    };

    try {
        const response: any = await fetch(url, options);
        const data = await response.json();

        return data;
    } catch (error) {
        throw new Error(`Usuário não encontrado: ${error}`);
    }
};

export default { fetchDataUser, updateDataUser };