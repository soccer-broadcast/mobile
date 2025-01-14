const baseURL = 'http://localhost:3200';

export interface Login {
    login: string;
    password: string;
    name?: string
}

export const fetchLogin = async (item: Login) => { 
    const url = `${baseURL}/login`;
    const body = {
        login: item.login,
        password: item.password
    };
    
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    };  

    try {
        const response: any = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro HTTP ${response.status}`);
        }

        return data;
    } catch (error) {
        throw new Error(`Email ou senha inválidos: ${error}`);
    }
};

export const fetchSignup = async (item: Login) => { 
    const url = `${baseURL}/user`;
    const body = {
        login: item.login,
        password: item.password,
        name: item.name
    };
    
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    };  

    try {
        const response: any = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro HTTP ${response.status}`);
        }

        return data;
    } catch (error) {
        throw new Error(`Email ou senha inválidos: ${error}`);
    }
};

export default { fetchLogin, fetchSignup };