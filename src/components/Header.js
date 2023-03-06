import React from "react";
import { Link } from "react-router-dom";

const Header = ({ setInGame }) => {
    return (
        <div className="p-10">
            <Link to="/">
                <div
                    className="logo flex max-sm:justify-center items-center gap-1"
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
                    <h1 className="font-bold text-xl max-sm:text-4xl">
                        Connect 4
                    </h1>
                </div>
            </Link>
        </div>
    );
};

export default Header;
