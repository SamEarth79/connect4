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
                return true;
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
                return true;
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
                return true;
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
                return true;
            }
        }
    };

    const gsapAnimations = (playerTurn) => {
        let winPlayer = 1;
        if (playerTurn === -1) winPlayer = 2;

        document.querySelector(
            ".result"
        ).innerHTML = `Player ${winPlayer} wins`;

        gsap.fromTo(
            ".result",
            { y: -400, duration: 2, opacity: 0 },
            { y: 0, opacity: 1 }
        );
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
                if (checkWinner(updatedBoard, iy, ix, playerTurn)) {
                    gsapAnimations(playerTurn);
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
        <div>
            <Header setInGame={setInGame} />
            <div className="game-section">
                <div className="board flex items-center justify-center border-2 rounded-lg p-4 w-fit mx-auto ">
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
                                            className={`${cellColor} aspect-square h-[3.5rem] m-[.8rem] rounded-full`}
                                        ></div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="Footer">
                <div className="flex gap-20 justify-center items-center">
                    <div className="flex items-center">
                        <p className="text-xl font-semibold pl1 underline underline-offset-8">
                            {player1Name}
                        </p>
                        <div className="bg-red-500 aspect-square h-[3.5rem] m-[.8rem] rounded-full flex justify-center items-center font-mono font-bold text-xl">
                            {p1Score}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 -mb-4">
                        <div className="result text-3xl font-bold transition-all duration-500"></div>
                        <div className="flex flex-col items-center justify-center">
                            {/* <BiRefresh
                                className="text-4xl"
                                onClick={() => {
                                    setP1Score(0);
                                    setP2Score(0);
                                }}
                            /> */}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="bg-yellow-500 aspect-square h-[3.5rem] m-[.8rem] rounded-full flex justify-center items-center font-mono font-bold text-xl">
                            {p2Score}
                        </div>
                        <p className="text-xl font-semibold pl2">
                            {player2Name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
