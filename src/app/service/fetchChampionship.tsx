const bearerToken = 'Bearer live_378a59495af5df81988afefdc2cf99';
    
export const fetchDataChampionshipTable = async () => { 
    const url = `https://api.api-futebol.com.br/v1/campeonatos/6/tabela`;
    const options = {
        method: 'GET',
        headers: { 'Authorization': bearerToken }
    };

    try {
        const response: any = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error');
        console.log(error);
        throw new Error(`Erro ao buscar tabela de campeonato: ${error}`);
    }
};

export const fetchDataChampionship = async () => { 
    const url = `https://api.api-futebol.com.br/v1/campeonatos/6`;
    const options = {
        method: 'GET',
        headers: { 'Authorization': bearerToken }
    };

    try {
        const response: any = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Erro ao buscar o campeonato: ${error}`);
    }
};

export default { fetchDataChampionship, fetchDataChampionshipTable };