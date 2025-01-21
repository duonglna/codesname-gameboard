import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Guesser() {
    const router = useRouter();
    const { gameId } = router.query;
    const [board, setBoard] = useState([]);

    // Fetch the game board from API
    useEffect(() => {
        if (!gameId) return;

        fetch(`/api/fetch-board?gameId=${gameId}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch game data');
                return res.json();
            })
            .then((data) => setBoard(data.board))
            .catch((error) => console.error('Error fetching board:', error));
    }, [gameId]);

    // Handle card reveal
    const revealCard = (index) => {
        setBoard((prevBoard) =>
            prevBoard.map((tile, i) =>
                i === index ? { ...tile, revealed: true } : tile
            )
        );
    };

    return (
        <div>
            <h1>Guesser View</h1>
            <div className="board">
                {board.map((tile, index) => (
                    <div
                        key={index}
                        className={`tile ${tile.revealed ? tile.type : ''}`}
                        onClick={() => revealCard(index)}
                    >
                        {tile.word}
                    </div>
                ))}
            </div>
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
                    cursor: pointer;
                }
                .red {
                    background: lightcoral;
                }
                .blue {
                    background: lightblue;
                }
                .neutral {
                    background: lightgray;
                }
                .assassin {
                    background: black;
                    color: white;
                }
            `}</style>
        </div>
    );
}
