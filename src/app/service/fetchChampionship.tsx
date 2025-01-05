const bearerToken = 'Bearer live_378a59495af5df81988afefdc2cf99';
const baseURL = 'http://localhost:3200';

    
export const fetchDataChampionshipTable = async () => { 
    const url = `${baseURL}/table/2ff7dec9-2bd5-4c23-9d94-ddb7d5ff9bf5`;
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

export const fetchDataChampionship = async () => { 
    const url = `${baseURL}/championship/2ff7dec9-2bd5-4c23-9d94-ddb7d5ff9bf5`;
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

export default { fetchDataChampionship, fetchDataChampionshipTable };