import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

    try {
        // Fetch words from Supabase
        const { data: words, error } = await supabase.from('words').select('word').limit(100);
        if (error) throw error;

        // Shuffle and pick 25 words for the board
        const shuffledWords = words.sort(() => 0.5 - Math.random()).slice(0, 25);

        // Assign types: 8 red, 8 blue, 8 neutral, 1 assassin
        const cardTypes = Array(8).fill('red')
            .concat(Array(8).fill('blue'))
            .concat(Array(8).fill('neutral'));
        
        // Shuffle card types
        const shuffledCardTypes = cardTypes.sort(() => 0.5 - Math.random());

        // Create board with assassin at the center
        const board = shuffledWords.map((word, index) => ({
            word: word.word,
            type: index === 12 ? 'assassin' : shuffledCardTypes.pop(), // Assassin in the center
            revealed: false,
        }));

        // Create a unique game ID
        const id = uuidv4();

        // Save game to Supabase
        await supabase.from('games').insert([{ id, board }]);

        res.status(200).json({ id });
    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ error: 'Failed to create game' });
    }
}
