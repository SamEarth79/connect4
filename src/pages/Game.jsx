import React, { useState } from "react";
import Header from "../components/Header";
import gsap from "gsap";

const Game = ({ player1Name, player2Name, setInGame }) => {
    const boardXSize = 7;
    const boardYSize = 8;

    const getInitBoard = (boardXSize, boardYSize) => {
        let tempArr = [],
            tempBoard = [];

        for (let times = 0; times < boardYSize; times++) {
            tempArr = [];
            for (let index = 0; index < boardXSize; index++) {
                tempArr.push(0);
            }
            tempBoard.push(tempArr);
        }
        return tempBoard;
    };

    const checkWinner = (updatedBoard, c, r, player) => {
        // Horizontal check
        for (let i = c - 3; i <= c; i++) {
            if (
                updatedBoard[r][i] === updatedBoard[r][i + 1] &&
                updatedBoard[r][i + 1] === updatedBoard[r][i + 2] &&
                updatedBoard[r][i + 2] === updatedBoard[r][i + 3] &&
                updatedBoard[r][i + 3] === player
            ) {
                return [true, [r, i], [r, i + 1], [r, i + 2], [r, i + 3]];
            }
        }
        // Vertical check
        for (let i = r - 3; i <= r; i++) {
            if (
                i >= 0 &&
                i + 3 < boardYSize &&
                updatedBoard[i][c] === updatedBoard[i + 1][c] &&
                updatedBoard[i + 1][c] === updatedBoard[i + 2][c] &&
                updatedBoard[i + 2][c] === updatedBoard[i + 3][c] &&
                updatedBoard[i + 3][c] === player
            ) {
                return [true, [i, c], [i + 1, c], [i + 2, c], [i + 3, c]];
            }
        }
        // Diagonal check
        for (let i = r - 3, j = c - 3; i <= r && j <= c; i++, j++) {
            if (
                i >= 0 &&
                i + 3 < boardYSize &&
                updatedBoard[i][j] === updatedBoard[i + 1][j + 1] &&
                updatedBoard[i + 1][j + 1] === updatedBoard[i + 2][j + 2] &&
                updatedBoard[i + 2][j + 2] === updatedBoard[i + 3][j + 3] &&
                updatedBoard[i + 3][j + 3] === player
            ) {
                return [
                    true,
                    [i, j],
                    [i + 1, j + 1],
                    [i + 2, j + 2],
                    [i + 3, j + 3],
                ];
            }
        }

        for (let i = r + 3, j = c - 3; i >= r && j <= c; i--, j++) {
            console.log(i);
            if (
                i - 3 >= 0 &&
                i < boardYSize &&
                // j >= 0 &&
                // j + 3 < boardXSize &&
                updatedBoard[i][j] === updatedBoard[i - 1][j + 1] &&
                updatedBoard[i - 1][j + 1] === updatedBoard[i - 2][j + 2] &&
                updatedBoard[i - 2][j + 2] === updatedBoard[i - 3][j + 3] &&
                updatedBoard[i - 3][j + 3] === player
            ) {
                return [
                    true,
                    [i, j],
                    [i - 1, j + 1],
                    [i - 2, j + 2],
                    [i - 3, j + 3],
                ];
            }
        }

        return [false];
    };

    const gsapAnimations = (playerTurn, [status, ...coords]) => {
        let winPlayer = 1;
        if (playerTurn === -1) winPlayer = 2;

        if (winPlayer === 1)
            document.querySelector(".winner-card-1").classList.toggle("hidden");
        else
            document.querySelector(".winner-card-2").classList.toggle("hidden");

        gsap.fromTo(
            ".winner-card",
            { y: 200, opacity: 0, ease: "back" },
            { y: 0, opacity: 1, ease: "back", duration: 2 }
        );

        coords.forEach((coord) => {
            let className = coord[1] + "" + coord[0];
            console.log(className);
            gsap.fromTo(`._${className}`, { y: 0, duration: 4 }, { y: -50 });
            gsap.fromTo(
                `._${className}`,
                { y: -50, duration: 4 },
                { y: 0, delay: 0.5 }
            );
        });

        setTimeout(() => {
            if (winPlayer === 1)
                document
                    .querySelector(".winner-card-1")
                    .classList.toggle("hidden");
            else
                document
                    .querySelector(".winner-card-2")
                    .classList.toggle("hidden");
        }, 4000);
    };

    const modifyCell = async (indexY, playerTurn) => {
        if (disable) {
            // alert("disabled");
            return;
        }
        console.log("-----");
        // console.log(`${indexX} ${indexY}`);
        const updatedBoard = board.map((row, index_y) => {
            if (indexY === index_y) {
                let i = boardYSize - 1;
                while (i > 0 && row[i] !== 0) i--;
                row[i] = playerTurn;
                return row;
                // return row.map((cell, index_x) => {
                //     if (indexX === index_x) return playerTurn;
                //     else return cell;
                // });
            } else return row;
        });

        console.log(updatedBoard);
        setBoard(updatedBoard);
        let foundWinner = false;
        for (let iy = 0; iy < boardXSize; iy++) {
            for (let ix = 0; ix < boardYSize; ix++) {
                let result = checkWinner(updatedBoard, iy, ix, playerTurn);
                if (result[0]) {
                    gsapAnimations(playerTurn, result);
                    setDisable(true);
                    setTimeout(() => {
                        setBoard(initBoard);
                        document.querySelector(".result").innerHTML = ``;
                        if (playerTurn === 1) setP1Score(p1Score + 1);
                        else setP2Score(p2Score + 1);
                        setDisable(false);
                    }, 4000);

                    foundWinner = true;
                    break;
                } else {
                    document.querySelector(".result").innerHTML = ``;
                }
            }
            if (foundWinner) break;
        }

        nextPlayer(playerTurn);
    };

    if (player1Name === "") player1Name = "Player 1";
    if (player2Name === "") player2Name = "Player 2";

    const initBoard = getInitBoard(boardXSize, boardYSize);
    const [board, setBoard] = useState(initBoard);
    const [playerTurn, setPlayerTurn] = useState(1);
    const [p1Score, setP1Score] = useState(0);
    const [p2Score, setP2Score] = useState(0);
    const [disable, setDisable] = useState(false);

    const nextPlayer = (currPlayer) => {
        if (currPlayer === 1) {
            document.querySelector(".pl1").classList.toggle("underline");
            document
                .querySelector(".pl1")
                .classList.toggle("underline-offset-8");
            document.querySelector(".pl2").classList.toggle("underline");
            document
                .querySelector(".pl2")
                .classList.toggle("underline-offset-8");
            setPlayerTurn(-1);
        } else {
            document.querySelector(".pl1").classList.toggle("underline");
            document
                .querySelector(".pl1")
                .classList.toggle("underline-offset-8");
            document.querySelector(".pl2").classList.toggle("underline");
            document
                .querySelector(".pl2")
                .classList.toggle("underline-offset-8");
            setPlayerTurn(1);
        }
    };
    return (
        <div className="h-screen w-screen flex flex-col justify-around bg-gradient-to-r from-red-50 to-yellow-50">
            <Header setInGame={setInGame} />
            <div className="game-section">
                <div className="board flex items-center justify-center border-2 rounded-lg p-4 max-sm:mx-1 lg:w-fit mx-auto ">
                    {board.map((row, indexY) => {
                        return (
                            <div
                                key={indexY}
                                className="flex flex-col hover:bg-gray-200 rounded-md"
                                onClick={() => {
                                    modifyCell(indexY, playerTurn);
                                }}
                            >
                                {row.map((cell, indexX) => {
                                    let cellColor;
                                    if (cell === 1) cellColor = "bg-red-500";
                                    else if (cell === -1)
                                        cellColor = "bg-yellow-500";
                                    else cellColor = "bg-gray-500";
                                    return (
                                        <div
                                            key={indexX + "" + indexY}
                                            className={`${cellColor} _${
                                                indexX + "" + indexY
                                            } aspect-square h-[3.5rem] m-[.8rem] max-sm:h-[2rem] max-sm:m-[.4rem] rounded-full`}
                                        ></div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="Footer">
                <div className="flex gap-20 max-sm:gap-10 justify-center items-center">
                    <div className="flex items-center">
                        <p className="text-xl font-semibold max-sm:text-base whitespace-nowrap pl1 underline underline-offset-8">
                            {player1Name}
                        </p>
                        <div className="bg-red-500 aspect-square h-[3.5rem] m-[.8rem] rounded-full flex justify-center items-center font-mono font-bold text-xl">
                            {p1Score}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 -mb-4">
                        <div className="result text-3xl font-bold transition-all duration-500"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="bg-yellow-500 aspect-square h-[3.5rem] m-[.8rem] rounded-full flex justify-center items-center font-mono font-bold text-xl">
                            {p2Score}
                        </div>
                        <p className="text-xl font-semibold pl2 max-sm:text-base whitespace-nowrap">
                            {player2Name}
                        </p>
                    </div>
                </div>
            </div>
            <div className="winner-card-1 hidden fixed top-0 left-0 w-full h-screen bg-black/60">
                <div className="bg-red-500 text-white winner-card px-20 py-10 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                    <h1 className="text-3xl max-sm:text-xl whitespace-nowrap font-semibold tracking-wider">
                        Player 1 wins
                    </h1>
                </div>
            </div>
            <div className="winner-card-2 hidden fixed top-0 left-0 w-full h-screen bg-black/60">
                <div className="bg-yellow-400 text-white winner-card px-20 py-10 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                    <h1 className="text-3xl max-sm:text-xl whitespace-nowrap font-semibold tracking-wider">
                        Player 2 wins
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Game;
