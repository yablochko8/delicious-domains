import { useState } from "react";

/**
 * Small expandable that apears on the homepage. Closed by default.
 */
export const WhatIsThis = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <h2 className="text-2xl font-bold text-center text-secondary">delicious.domains</h2>
            <div className="flex flex-row justify-center">
                <button className="btn btn-ghost text-xl" onClick={() => setIsOpen(!isOpen)}> what is this?</button>
            </div>
            <div className={`transform transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-row mt-2">
                    <div className="flex flex-col space-y-2">
                        <p>This tool gives you name ideas, checks for domains that are available.</p>
                        <p>It includes lots of BRAND.THING style domains, which are a TERRIBLE IDEA (according to <a href="http://aux.messymatters.com/pgnames.html" target="_blank" rel="noopener noreferrer">Paul Graham in 2006</a>) and again in <a href="https://paulgraham.com/name.html" target="_blank" rel="noopener noreferrer">2015</a>. Other good reading:</p>
                        <ul>
                            <li><a href="https://messymatters.com/nominology" target="_blank" rel="noopener noreferrer">Nominology (dreeves, 2011)</a></li>
                            <li><a href="https://domatron.com" target="_blank" rel="noopener noreferrer">Domatron: (good for .com names)</a></li>
                            <li><a href="https://instantdomainsearch.com/" target="_blank" rel="noopener noreferrer">Instant Domain Search: (good for everything else)</a></li>
                        </ul>
                        <p>Please don't share outside the cohort, it uses APIs that cost Lui money.</p>
                        <div className="flex justify-center py-4">
                            <button className="btn btn-warning" onClick={() => setIsOpen(false)}>just let me use the terrible tool</button>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
};
