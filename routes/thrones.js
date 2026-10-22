import express from 'express';
import { getAllCharacters, getCharacterDetails } from '../services/gotApi.js';

const router = express.Router();

router.get('/',async(req, res, next) =>{
    try{
        const characters = await getAllCharacters();
        res.json(characters);
    } catch(error){
        next(error);
    }
});

router.get('characters/:id', async (req, res, next) => {
    try{
        const {id} = req.params;

    }catch(error){
        next(error);
    }
});

export default router;