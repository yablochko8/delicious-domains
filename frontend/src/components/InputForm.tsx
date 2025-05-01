import { InputRefreshed } from "./ExpandyInput";
import { useInputStateStore } from "../stores/inputStateStore";
import { useMemo, useState } from "react";
import { InputTldCheckbox } from "./InputTldCheckbox";

const EXAMPLE_PURPOSES = [
    "linkedin for cats",
    "instagram for giraffes",
    "uber for lawnmowers",
    "airbnb for camping sites",
    "spotify for podcasts",
]

// const EXAMPLE_VIBES = [
//     "slick, sophisticated, fresh",
//     "funny, quirky, playful",
//     "professional, serious, trustworthy",
//     "casual, friendly, approachable",
//     "minimalist, clean, modern",
//     "bold, adventurous, innovative",
//     "sophisticated, elegant, luxurious",
//     "trendy, hip, cool",
//     "playful, youthful, energetic",
// ]

const TLD_OPTIONS = [
    ".com",
    ".ai",
    ".io",
    ".app",
    ".dev",
    ".xyz",
    ".net",
    ".org",
    ".agency",
    ".art",
    ".biz",
    ".blog",
    ".center",
    ".click",
    ".cloud",
    ".club",
    ".co",
    ".company",
    ".consulting",
    ".data",
    ".design",
    ".digital",
    ".diy",
    ".expert",
    ".fun",
    ".global",
    ".group",
    ".info",
    ".ink",
    ".life",
    ".live",
    ".me",
    ".media",
    ".network",
    ".news",
    ".online",
    ".pro",
    ".shop",
    ".site",
    ".solutions",
    ".space",
    ".store",
    ".studio",
    ".tech",
    ".team",
    ".today",
    ".works",
    ".world"
]

export const InputForm = () => {
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
    const {
        purpose,
        // vibe,
        preferredTlds,
        setPurpose,
        // setVibe,
        togglePreferredTld
    } = useInputStateStore();

    // useMemo to avoid re-rendering with a new random purpose on every interaction
    const randomPurpose = useMemo(
        () => EXAMPLE_PURPOSES[Math.floor(Math.random() * EXAMPLE_PURPOSES.length)],
        []
    );
    // const randomVibe = useMemo(
    //     () => EXAMPLE_VIBES[Math.floor(Math.random() * EXAMPLE_VIBES.length)],
    //     []
    // );

    return (
        <div className="flex flex-col gap-4 py-4 pt-20">

            <InputRefreshed
                question="What are you building?"
                subhead="For best results, paste in a full description here"
                value={purpose}
                onChange={(e) => {
                    setPurpose(e.target.value);
                }}
                placeholder={`E.g. "${randomPurpose}"`}
            />

            {/* <ExpandyInput
                question="what's the vibe?"
                value={vibe}
                onChange={(e) => {
                    setVibe(e.target.value);
                }}
                placeholder={`e.g. "${randomVibe}"`}
            /> */}
            {showAdvancedOptions && (
                <>
                    <div>
                        <h3>preferred top-level domains?</h3>
                        <p className="text-sm text-base-content/60">tick nothing to stick to a longer list of ~350 options</p>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        {TLD_OPTIONS.map((tld) => (
                            <InputTldCheckbox key={tld} tld={tld} checked={preferredTlds.includes(tld)} onChange={() => togglePreferredTld(tld)} />
                        ))}
                    </div>
                </>
            )}
            <div className="flex flex-row w-full justify-end items-center gap-2">
                <button className="btn btn-sm" onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
                    {showAdvancedOptions ? "hide advanced options" : "advanced options"}
                </button>
            </div>
        </div>
    )
}