import React, { useEffect, useState } from "react";
import gsap from "gsap";
import Game from "./Game";

const Main = () => {
    const [player1Name, setPlayer1Name] = useState("Player 1");
    const [player2Name, setPlayer2Name] = useState("Player 2");
    const [inGame, setInGame] = useState(false);

    const gsapAnimations = () => {
        gsap.fromTo(
            ".dot1",
            { y: -1000, height: "1rem", opacity: 0 },
            { y: 0, height: "1.5rem", delay: 0.4, opacity: 1, duration: 0.8 }
        );
        gsap.fromTo(
            ".dot2",
            { x: -1000, height: "1rem", opacity: 0 },
            { x: 0, height: "1.5rem", opacity: 1, duration: 1.2 }
        );
        gsap.fromTo(
            ".dot3",
            { x: 1000, height: "1rem", opacity: 0 },
            { x: 0, height: "1.5rem", opacity: 1, duration: 1.2 }
        );
        gsap.fromTo(
            ".dot4",
            { y: 1000, height: "1rem", opacity: 0 },
            { y: 0, height: "1.5rem", opacity: 1, duration: 1.2 }
        );

        gsap.fromTo(".connect", { x: 400 }, { x: 0, delay: 1, duration: 1.5 });

        gsap.fromTo(
            ".player-names",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, delay: 1.5, duration: 1.5 }
        );

        gsap.fromTo(
            ".play-button",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, delay: 2, duration: 1.5 }
        );
    };

    useEffect(() => {
        gsapAnimations();
    }, [inGame]);

    return !inGame ? (
        <div className="flex flex-col items-center h-screen justify-end p-32 gap-10 relative">
            <div className="flex items-center gap-4 absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
                <div className="flex gap-2 connect_parent">
                    <h1 className="connect text-[4.5rem] font-light translate-x-[5em]">
                        Sansu 4
                    </h1>
                </div>
                <div className="flex gap-2 dots">
                    <div className="flex flex-col gap-2">
                        <div className="dot1 rounded-full aspect-square h-[1.5rem] bg-red-500"></div>
                        <div className="dot2 rounded-full aspect-square h-[1.5rem] bg-yellow-500"></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="dot3 rounded-full aspect-square h-[1.5rem] bg-yellow-500"></div>
                        <div className="dot4 rounded-full aspect-square h-[1.5rem] bg-red-500"></div>
                    </div>
                </div>
            </div>
            <div className="player-names flex flex-col gap-4">
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Player 1"
                    onChange={(e) => {
                        setPlayer1Name(e.target.value);
                    }}
                    className="p-4 border-[2px] border-red-500 rounded-full focus:outline-none"
                />
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Player 2"
                    onChange={(e) => {
                        setPlayer2Name(e.target.value);
                    }}
                    className="p-4 border-[2px] border-yellow-500 rounded-full focus:outline-none"
                />
            </div>
            <div className="play-button">
                <button
                    className="border-2 border-black rounded-full p-5 aspect-square"
                    onClick={() => {
                        setInGame(true);
                    }}
                >
                    Play
                </button>
            </div>
        </div>
    ) : (
        <Game
            player1Name={player1Name}
            player2Name={player2Name}
            setInGame={setInGame}
        />
    );
};

export default Main;
