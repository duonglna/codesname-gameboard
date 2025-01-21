import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Spymaster() {
    const router = useRouter();
    const { gameId } = router.query;
    const [board, setBoard] = useState([]);

    useEffect(() => {
        if (!gameId) return;
        fetch(`/api/fetch-board?gameId=${gameId}`)
            .then((res) => res.json())
            .then((data) => setBoard(data.board))
            .catch((err) => console.error(err));
    }, [gameId]);

    return (
        <div>
            <h1>Spymaster View</h1>
            <div className="board">
                {board.map((tile, index) => (
                    <div key={index} className={`tile ${tile.type}`}>
                        {tile.word}
                    </div>
                    
                ))}
            </div>
            <p><a href={`./guesser?gameId=${gameId}`}>Guess view</a></p>
            <style jsx>{`
                .board {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 10px;
                }
                .tile {
                    padding: 20px;
                    border: 1px solid black;
                    text-align: center;
                }
                .red { background: lightcoral; }
                .blue { background: lightblue; }
                .neutral { background: lightgray; }
                .assassin { background: black; color: white; }
            `}</style>
        </div>
    );
}
