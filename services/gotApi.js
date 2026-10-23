const thronesAPI = 'https://thronesapi.com/api/v2/Characters';
const fireAndIceAPI = 'https://anapioficeandfire.com/api/characters';

export async function getAllCharecters(){
    const response = await fetch(thronesAPI);
    if (!response.ok)throw new Error('Failed to fetch from Thrones API');
    return await response.json();
}

export async function getCharacterDetails(id,name){
    const thronesRes = await fetch(`${thronesAPI}/${id}`);
    if (!thronesRes.ok){
        throw new Error('Failed to fetch from Thrones API');
    }
    const thronesData = await thronesRes.json();

    const nameQuery = encodeURIComponent(thronesData.fullName);
    const iceFireRes = await fetch (`${fireAndIceAPI}?name=${nameQuery}`);

    if(!iceFireRes.ok){
        throw new Error(`Failed to load records for ${thronesData.fullName}`);
    }

    const results = await iceFireRes.json();
    let iceFireData = {};
    if(results.length>0){
        const tvShowChars = results.find(c => c.playedBy && c.playedBy.length > 0 && c.playedBy[0] !== "");
        iceFireData = tvShowChars || results[0];
    }

    return{
        id:thronesData.id,
        name: thronesData.fullName,
        firstName: thronesData.firstName,
        lastName: thronesData.lastName,
        image: thronesData.imageUrl,
        family:thronesData.family,
        born:iceFireData.born || 'Unknown',
        died:iceFireData.died || 'Unknown',
        titles:iceFireData.titles,
        aliases:iceFireData.aliases,
        crest:''
    }
}