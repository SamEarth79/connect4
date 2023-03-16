import React, { useEffect, useState } from "react";
import gsap from "gsap";
import Game from "./Game";
import Spline from "@splinetool/react-spline";

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
        <div className="overflow-x-hidden bg-gradient-to-r from-red-50 to-yellow-50">
            <div className="flex flex-col items-center h-screen justify-end p-32 gap-10 relative">
                <div className="flex items-center gap-4 absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex gap-2 connect_parent">
                        <h1 className="connect text-[4.5rem] font-light translate-x-[5em] max-sm:text-[2rem] whitespace-nowrap">
                            Connect 4
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
                <div className="player-names flex flex-col gap-4 items-center">
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
                    <div
                        className="play-button border-2 mt-4 text-white text-2xl font-semibold tracking-[0.2rem] rounded-full p-3 w-full text-center bg-redyellow-pattern bg-[length:732px_753px] bg-no-repeat bg-[center_bottom_-4rem] 
                    hover:bg-[center_bottom_-7rem] transition-all duration-300 
                    hover:bg-black hover:text-white cursor-pointer"
                        onClick={() => {
                            setInGame(true);
                        }}
                    >
                        Play
                    </div>
                </div>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2">
                <Spline scene="https://prod.spline.design/Cka7e3BTAPBAXReV/scene.splinecode" />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2">
                <Spline scene="https://prod.spline.design/3oD2qRA3YSrqy0Dc/scene.splinecode" />
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
