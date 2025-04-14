import { useState } from "react";
import { SocialIcons } from "../assets/Icons";

/**
 * Small expandable that apears on the homepage. Closed by default.
 */
export const WhatIsThis = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <h1 className="text-center text-primary">delicious.domains</h1>
            <div className="flex flex-row justify-center">
                <button className="btn btn-secondary" onClick={() => setIsOpen(!isOpen)}> what is this?</button>
            </div>
            <div className={`transform transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-row mt-2">
                    <div className="flex flex-col space-y-2">
                        <div>This tool gives you domain name ideas, but only shows domains that are available.</div>
                        <div>It includes lots of BRAND.THING style domains. Conventional wisdom says these are a TERRIBLE IDEA (according to Paul Graham in <a href="http://aux.messymatters.com/pgnames.html" target="_blank" rel="noopener noreferrer">2006</a> and again in <a href="https://paulgraham.com/name.html" target="_blank" rel="noopener noreferrer">2015</a>).</div>
                        <div>That said, usage of non-dotcom domains is growing. There are now over 1,000 top-level domain options, you probably haven't heard of most of them. If you're open to trying something different, there will be a ton of options.</div>
                        <div>The scoring categories build on ideas from these sources:</div>
                        <ul>
                            <li><a href="https://messymatters.com/nominology" target="_blank" rel="noopener noreferrer">Nominology (dreeves, 2011)</a></li>
                            <li><a href="https://discoversprout.com/blog/2019/4/24/choosing-a-company-name-the-smile-test" target="_blank" rel="noopener noreferrer">The SMILE Test (Jason Manarchuck, 2009)</a></li>
                        </ul>
                        <div>Other good tools:</div>
                        <ul>
                            <li><a href="https://domatron.com" target="_blank" rel="noopener noreferrer">Domatron: (good for .com names)</a></li>
                            <li><a href="https://instantdomainsearch.com/" target="_blank" rel="noopener noreferrer">Instant Domain Search: (good for everything else)</a></li>
                        </ul>
                        <div>Please don't share outside the cohort, it uses APIs that cost Lui money.</div>
                        <div className="text-sm">
                            <a href="https://github.com/yablochko8/delicious-domains" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                {SocialIcons.github}
                                see code on github
                            </a>
                        </div>
                        <div className="text-sm">
                            <a href="https://x.com/yablochko" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                {SocialIcons.twitter} follow me on twitter
                            </a>
                        </div>

                        <div className="flex justify-center py-4">
                            <button className="btn btn-warning" onClick={() => setIsOpen(false)}>just let me use the terrible tool</button>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
};
