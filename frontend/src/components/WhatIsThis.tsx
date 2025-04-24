import { useState } from "react";
import { SocialIcons } from "../assets/Icons";
import { WEBSITE_NAME } from "../config";


export const WhatIsThisContents = () => {
    return (
        <>
            <div className="mb-4 text-lg font-medium">This tool gives you website domain name ideas, but only shows cheap, available domains.</div>

            <div className="mb-4">It includes lots of BRAND.THING style domains. Conventional wisdom says these are a terrible idea (e.g. Paul Graham advocating to stick to dotcom domains in <a href="http://aux.messymatters.com/pgnames.html" target="_blank" rel="noopener noreferrer" >2006</a> and again in <a href="https://paulgraham.com/name.html" target="_blank" rel="noopener noreferrer" >2015</a>).</div>

            <div className="mb-4">That said, usage of non-dotcom domains is growing. There are now over 1,000 top-level domain options, you probably haven't heard of most of them. If you're open to trying something different, there will be a ton of options.</div>

            <div className="mb-4 font-medium">The scoring categories build on ideas from these sources:</div>
            <ul className="list-disc pl-6 mb-4 space-y-1">
                <li><a href="https://messymatters.com/nominology" target="_blank" rel="noopener noreferrer" >Nominology (dreeves, 2011)</a></li>
                <li><a href="https://discoversprout.com/blog/2019/4/24/choosing-a-company-name-the-smile-test" target="_blank" rel="noopener noreferrer" >The SMILE Test (Jason Manarchuck, 2009)</a></li>
            </ul>

            <div className="mb-4 font-medium">Other good tools:</div>
            <ul className="list-disc pl-6 mb-6 space-y-1">
                <li><a href="https://domatron.com" target="_blank" rel="noopener noreferrer" >Domatron: (good for .com names)</a></li>
                <li><a href="https://instantdomainsearch.com/" target="_blank" rel="noopener noreferrer" >Instant Domain Search: (good for everything else)</a></li>
            </ul>

            <div className="flex flex-col space-y-2 mt-6 border-t pt-4">
                Say hi:
                <div className="text-sm">
                    <a href="https://x.com/yablochko" target="_blank" rel="noopener noreferrer" >
                        {SocialIcons.twitter}
                    </a>
                    <a href="https://bsky.app/profile/yablochko.bsky.social" target="_blank" rel="noopener noreferrer" >
                        {SocialIcons.bluesky}
                    </a>
                </div>
            </div>
        </>
    );
};
/**
 * Small expandable that apears on the homepage. Closed by default.
 */
export const WhatIsThis = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <h1 className="text-center text-primary">{WEBSITE_NAME}</h1>
            <div className="flex flex-row justify-center">
                <button className="btn btn-secondary" onClick={() => setIsOpen(!isOpen)}> what is this?</button>
            </div>
            <div className={`transform transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-row mt-2">
                    <div className="flex flex-col space-y-2">
                        <WhatIsThisContents />
                        <div className="flex justify-center py-4">
                            <button className="btn btn-warning" onClick={() => setIsOpen(false)}>just let me use the terrible tool</button>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
};
