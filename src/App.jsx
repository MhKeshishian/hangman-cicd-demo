import { useState } from "react";
import "./App.css";

const words = [
  { word: "react", hint: "A JavaScript library for building user interfaces." },
  { word: "github", hint: "A platform used for Git repositories and collaboration." },
  { word: "deploy", hint: "To publish an application so others can use it." },
  { word: "netlify", hint: "A platform often used to host frontend web apps." },
  { word: "pipeline", hint: "An automated sequence of build, test, and deploy steps." }
];

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function getRandomItem() {
  return words[Math.floor(Math.random() * words.length)];
}

export default function App() {
    const [game, setGame] = useState(getRandomItem());
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);

    const maxWrong = 6;

    function handleLetterClick(letter) {
        if (guessedLetters.includes(letter)) return;

        const updatedGuesses = [...guessedLetters, letter];
        setGuessedLetters(updatedGuesses);

        if (!game.word.includes(letter)) {
        setWrongGuesses((prev) => prev + 1);
        }
    }

    function restartGame() {
        setGame(getRandomItem());
        setGuessedLetters([]);
        setWrongGuesses(0);
    }

    const displayWord = game.word
        .split("")
        .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");

    const isWin = game.word.split("").every((letter) => guessedLetters.includes(letter));
    const isLose = wrongGuesses >= maxWrong;

    return (
        <div className="page">
            <div className="game-card">
                <div className="left-panel">
                    <div className="gallows">
                        <div className="base"></div>
                        <div className="pole"></div>
                        <div className="top-bar"></div>
                        <div className="rope"></div>

                        {wrongGuesses > 0 && <div className="head"></div>}
                        {wrongGuesses > 1 && <div className="body"></div>}
                        {wrongGuesses > 2 && <div className="arm left-arm"></div>}
                        {wrongGuesses > 3 && <div className="arm right-arm"></div>}
                        {wrongGuesses > 4 && <div className="leg left-leg"></div>}
                        {wrongGuesses > 5 && <div className="leg right-leg"></div>}
                    </div>

                    <h1 className="game-title">HANGMAN GAME</h1>        </div>

                <div className="right-panel">
                    <div className="word-display">{displayWord}</div>

                    <p className="hint">
                        <strong>Hint:</strong> {game.hint}
                    </p>

                    <p className="score">
                        Incorrect guesses: <span>{wrongGuesses}</span> / {maxWrong}
                    </p>

                    {!isWin && !isLose && (
                        <div className="keyboard">
                        {alphabet.map((letter) => (
                            <button
                            key={letter}
                            className="letter-btn"
                            onClick={() => handleLetterClick(letter)}
                            disabled={guessedLetters.includes(letter)}
                            >
                            {letter.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    )}

                    {isWin && <h2 className="message win">You Win</h2>}
                    {isLose && <h2 className="message lose">You Lost — Word was: {game.word}</h2>}

                    {(isWin || isLose) && (
                        <button className="restart-btn" onClick={restartGame}>
                            Play Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}