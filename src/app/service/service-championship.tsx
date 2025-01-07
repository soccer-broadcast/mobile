const bearerToken = 'Bearer live_378a59495af5df81988afefdc2cf99';
const baseURL = 'http://localhost:3200';

    
export const fetchDataChampionshipTable = async () => { 
    const url = `${baseURL}/table/b9b0371b-4030-4dde-b020-fc42dcdf89b0`;
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
    const url = `${baseURL}/championship/b9b0371b-4030-4dde-b020-fc42dcdf89b0`;
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