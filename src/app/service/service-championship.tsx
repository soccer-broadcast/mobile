const bearerToken = 'Bearer live_378a59495af5df81988afefdc2cf99';
const baseURL = 'http://localhost:3200';

    
export const fetchDataChampionshipTable = async (id :string) => { 
    const url = `${baseURL}/table/${id}`;
    const options = {
        method: 'GET',
        headers: { 'Authorization': bearerToken }
    };

    try {
        const response: any = await fetch(url, options);
        const data = await response.json();

        return JSON.parse(data[0].jsonFromExternalApi);
    } catch (error) {
        throw new Error(`Erro ao buscar tabela de campeonato: ${error}`);
    }
};

export const fetchDataChampionship = async (id :string) => { 
    const url = `${baseURL}/championship/${id}`;
    const options = {
        method: 'GET',
        headers: { 'Authorization': bearerToken }
    };

    try {
        const response: any = await fetch(url, options);
        const data = await response.json();

        return JSON.parse(data[0].jsonFromExternalApi);
    } catch (error) {
        throw new Error(`Erro ao buscar o campeonato: ${error}`);
    }
};

export const fetchAllChampionships = async () => { 
    const url = `${baseURL}/championships`;

    try {
        const response: any = await fetch(url);
        return await response.json();
    } catch (error) {
        throw new Error(`Erro ao buscar o campeonato: ${error}`);
    }
};


export default { fetchDataChampionship, fetchDataChampionshipTable, fetchAllChampionships };