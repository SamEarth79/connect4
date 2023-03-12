import React from "react";

const Header = ({ setInGame }) => {
    return (
        <div
            className="logo flex max-sm:justify-center items-center gap-1 cursor-pointer p-10 w-full"
            onClick={() => {
                setInGame(false);
            }}
        >
            <div className="flex flex-col gap-1">
                <div className="rounded-full aspect-square h-3 max-sm:h-4 bg-red-500"></div>
                <div className="rounded-full aspect-square h-3 max-sm:h-4 bg-yellow-500"></div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="rounded-full aspect-square h-3 max-sm:h-4 bg-yellow-500"></div>
                <div className="rounded-full aspect-square h-3 max-sm:h-4 bg-red-500"></div>
            </div>
            <h1 className="font-bold text-xl max-sm:text-4xl">Connect 4</h1>
        </div>
    );
};

export default Header;
