import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end('Method Not Allowed');

    const { gameId } = req.query;
    try {
        const { data, error } = await supabase.from('games').select('*').eq('id', gameId).single();
        if (error || !data) return res.status(404).json({ error: 'Game not found' });

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching game:', error);
        res.status(500).json({ error: 'Failed to fetch game' });
    }
}
