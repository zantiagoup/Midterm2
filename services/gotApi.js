const thronesAPI = 'https://thronesapi.com/api/v2/Characters';
const fireAndIceAPI = 'https://anapioficeandfire.com/api/characters';
const crests = ['stark', 'lannister', 'targaryen', 'baratheon']; // 4 shield. in public/img/crests

// house name. pick shield. api typo ok
function getCrest(id, family){
    const name = (family || '').toLowerCase();
    let house = crests[id % 4]; // no shield? take one by id

    if (name.includes('stark')) house = 'stark';
    if (name.includes('lannister') || name.includes('lanister')) house = 'lannister';
    if (name.includes('targaryen') || name.includes('targaryan')) house = 'targaryen';
    if (name.includes('baratheon')) house = 'baratheon';

    return `/img/crests/${house}.png`;
}

export async function getAllCharecters(){
    const response = await fetch(thronesAPI);
    if (!response.ok)throw new Error('Failed to fetch from Thrones API');
    return await response.json();
}

export async function getCharacterDetails(id,name){
    const thronesRes = await fetch(`${thronesAPI}/${id}`);
    if (!thronesRes.ok){
        const error = new Error('Failed to fetch from Thrones API');
        error.status = 502; // api dead. 502

        if (thronesRes.status === 400 || thronesRes.status === 404){
            error.message = 'Character not found';
            error.status = 404; // api say bad id. 404
        }
        throw error;
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
        crest: getCrest(thronesData.id, thronesData.family)
    }
}