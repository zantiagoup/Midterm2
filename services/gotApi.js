const thronesAPI = 'https://thronesapi.com/api/v2/Characters';
const fireAndIceAPI = 'https://anapioficeandfire.com/api/characters';

export async function getAllCharecters(){
    const resonse = await fetch(thronesAPI);
    if (!response.ok)throw new Error('Failed to fetch from Thrones API');
    return await response.json();
}

export async function getCharacterDetails(id,name){
    
}