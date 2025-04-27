import { ExpandyInput } from "./ExpandyInput";
import { useInputStateStore } from "../stores/inputStateStore";

const EXAMPLE_PURPOSES = [
    "linkedin for cats",
    "instagram for giraffes",
    "uber for lawnmowers",
    "airbnb for camping sites",
    "spotify for podcasts",
]

const EXAMPLE_VIBES = [
    "slick, sophisticated, fresh",
    "funny, quirky, playful",
    "professional, serious, trustworthy",
    "casual, friendly, approachable",
    "minimalist, clean, modern",
    "bold, adventurous, innovative",
    "sophisticated, elegant, luxurious",
    "trendy, hip, cool",
    "playful, youthful, energetic",
]

export const InputForm = () => {
    const { purpose, vibe, seriousDomainsOnly, setPurpose, setVibe, setSeriousDomainsOnly } = useInputStateStore();

    const randomPurpose = EXAMPLE_PURPOSES[Math.floor(Math.random() * EXAMPLE_PURPOSES.length)];
    const randomVibe = EXAMPLE_VIBES[Math.floor(Math.random() * EXAMPLE_VIBES.length)];

    return (
        <div className="flex flex-col gap-4 p-4">

            <ExpandyInput
                question="what are you building?"
                subhead="for best results, paste in a full description here"
                value={purpose}
                onChange={(e) => {
                    setPurpose(e.target.value);
                }}
                placeholder={randomPurpose}
            />

            <ExpandyInput
                question="what's the vibe?"
                value={vibe}
                onChange={(e) => {
                    setVibe(e.target.value);
                }}
                placeholder={randomVibe}
            />
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