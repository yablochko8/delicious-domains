import { InputRefreshed } from "./ExpandyInput";
import { useInputStateStore } from "../stores/inputStateStore";
import { useMemo, useState } from "react";
import { InputTldCheckbox } from "./InputTldCheckbox";
import { ActionIcons } from "../assets/Icons";

const EXAMPLE_PURPOSES = [
    "linkedin for cats",
    "instagram for giraffes",
    "uber for lawnmowers",
    "airbnb for camping sites",
    "spotify for podcasts",
]

const VIBE_OPTIONS: string[] = [
    "bold",
    "casual",
    "clean",
    "cool",
    "elegant",
    "energetic",
    "friendly",
    "funny",
    "hip",
    "luxurious",
    "minimalist",
    "modern",
    "playful",
    "professional",
    "quirky",
    "serious",
    "simple",
    "slick",
    "trendy",
    "trustworthy",
    "youthful",
]

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
        vibeArray,
        preferredTlds,
        setPurpose,
        toggleVibe,
        togglePreferredTld,
        clearVibes,
        clearPreferredTlds
    } = useInputStateStore();

    // useMemo to avoid re-rendering with a new random purpose on every interaction
    const randomPurpose = useMemo(
        () => EXAMPLE_PURPOSES[Math.floor(Math.random() * EXAMPLE_PURPOSES.length)],
        []
    );

    return (
        <div className="flex flex-col gap-4 py-4 pt-20">

            <InputRefreshed
                question="What are you building?"
                subhead="The more detail the better! "
                value={purpose}
                onChange={(e) => {
                    setPurpose(e.target.value);
                }}
                placeholder={`E.g. "${randomPurpose}"`}
            />

            <div className="flex flex-row w-full justify-start items-center gap-2">
                <button className={`btn btn-sm font-normal rounded-lg text-sm ${showAdvancedOptions ? "btn-neutral" : "btn-ghost"}`} onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
                    {ActionIcons.generate}Advanced Options
                </button>
            </div>
            {showAdvancedOptions && (
                <>
                    <div>
                        <h3>What's your vibe?</h3>
                    </div>
                    <div>
                        <div className="flex flex-wrap gap-2">
                            {VIBE_OPTIONS.map((vibe) => (
                                <InputTldCheckbox key={vibe} tld={vibe} checked={vibeArray.includes(vibe)} onChange={() => toggleVibe(vibe)} />
                            ))}
                            {vibeArray.length > 0 && <button className="btn btn-sm btn-ghost" onClick={clearVibes}>clear vibes</button>}
                        </div>
                    </div>
                    <div>
                        <h3>Preferred domain extensions?</h3>
                        <p className="text-sm text-base-content/60">Tick nothing to stick to a longer list of ~350 options</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {TLD_OPTIONS.map((tld) => (
                            <InputTldCheckbox key={tld} tld={tld} checked={preferredTlds.includes(tld)} onChange={() => togglePreferredTld(tld)} />
                        ))}
                        {preferredTlds.length > 0 && <button className="btn btn-sm btn-ghost" onClick={clearPreferredTlds}>clear extensions</button>}
                    </div>
                </>
            )}
        </div>
    )
}