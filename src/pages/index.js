import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    const createGame = async () => {
        const res = await fetch('/api/create-game', { method: 'POST' });
        const { id } = await res.json();
        router.push(`/spymaster?gameId=${id}`);
    };

    return (
        <div>
            <h1>Codenames Game</h1>
            <button onClick={createGame}>Create New Game</button>
        </div>
    );
}
