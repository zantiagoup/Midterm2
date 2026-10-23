import express from 'express';
import { getAllCharecters, getCharacterDetails } from '../services/gotApi.js';

const router = express.Router();

router.get('/',async(req, res, next) =>{
    try{
        const characters = await getAllCharecters();
        const searchQuery = req.query.search?.toLowerCase();

        let filteredChars = characters;

        if(searchQuery){
            filteredChars = characters.filter(c =>
                c.fullName.toLowerCase().includes(searchQuery) || String(c.id) === searchQuery
            );
        }

        if(searchQuery && filteredChars.length === 0){
            const error = new Error(`No character matched "${req.query.search}".`);
            error.status = 404; // no find. 404
            throw error;
        }

        const mappedCatalog = filteredChars.map(c => ({
            id: c.id,
            name: c.fullName,
            image: c.imageUrl
        }));

        res.json(mappedCatalog);
    } catch(error){
        next(error);
    }
});

router.get('/characters/:id', async (req, res, next) => {
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            const error = new Error('Invalid ID');
            error.status = 400; // bad id. 400
            throw error;
        }

        const character = await getCharacterDetails(id);
        
        const allChars = await getAllCharecters();
        const total=allChars.length;

        character.prevId = (id - 1 + total) % total;
        character.nextId = (id + 1) % total;

        res.json(character);
    }catch(error){
        next(error);
    }
});

export default router;