import * as SecureStore from 'expo-secure-store';

export async function saveStorage(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

export async function getValueStorage(key: string) {
    return await SecureStore.getItemAsync(key);
}
  
export async function removeStorage(key: string) {
    await SecureStore.deleteItemAsync(key);
}
  

export default { saveStorage, getValueStorage };