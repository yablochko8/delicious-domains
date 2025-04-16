// import { VibeButton } from "./Buttons";
import { ExpandyInput } from "./ExpandyInput";
import { useInputStateStore } from "../stores/inputStateStore";
// import { useState } from "react";

// const STARTING_VIBES = [
//     "fun",
//     "casual",
//     "professional",
//     "creative",
//     "unique",
//     "trendy",
// ];

export const InputForm = () => {

    const { purpose, vibe, seriousDomainsOnly, setPurpose, setVibe, setSeriousDomainsOnly } = useInputStateStore();

    // const [suggestedVibes, setSuggestedVibes] =
    //     useState<string[]>(STARTING_VIBES);

    // const appendVibe = (vibe: string) => {
    //     setSuggestedVibes(
    //         suggestedVibes.filter((suggestedVibe) => suggestedVibe !== vibe)
    //     );
    // };

    return (
        <div className="flex flex-col gap-4 p-4">

            <ExpandyInput
                question="what are you building?"
                subhead="for best results, paste in a full description here"
                value={purpose}
                onChange={(e) => {
                    setPurpose(e.target.value);
                }}
                placeholder='e.g. "linkedin for wheat farmers"'
            />

            <ExpandyInput
                question="what's the vibe?"
                value={vibe}
                onChange={(e) => {
                    setVibe(e.target.value);
                }}
                placeholder='e.g. "slick, sophisticated, fresh"'
            />

            {/* <div className="flex flex-row gap-2 flex-wrap">
                {suggestedVibes.map((vibe) => (
                    <VibeButton vibe={vibe} onClick={appendVibe} key={vibe} />
                ))}
            </div> */}
            <div className="flex flex-row w-full justify-start items-center gap-2">
                <input
                    type="checkbox"
                    className="checkbox checkbox-success"
                    checked={seriousDomainsOnly}
                    onChange={() => setSeriousDomainsOnly(!seriousDomainsOnly)}
                />
                <label className="label cursor-pointer flex items-center">
                    serious domains only (.com / .ai / .io)
                </label>
            </div>

        </div>
    )
}