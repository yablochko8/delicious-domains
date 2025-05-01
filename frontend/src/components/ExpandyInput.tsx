import { useDomainGeneration } from "../hooks/useDomainGeneration";
import { EnterButton } from "./Buttons";

type ExpandyInputProps = {
    question: string;
    subhead?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export const InputRefreshed = ({ question, subhead, value, onChange, placeholder }: ExpandyInputProps) => {
    const { generateDomains } = useDomainGeneration();

    // If a user hits Enter in this input, we want to trigger generate domains
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            generateDomains();
        }
    }

    return (
        <div className="space-y-2">
            <div>
                <p className="text-form-heading">{question}</p>
                {subhead && <p className="text-form-subheading">{subhead}</p>}
            </div>
            <div className="relative">
                <input
                    type="text"
                    className="input-background w-full max-w-500 text-base p-3 pr-10 border-1 border-black rounded-2xl drop-shadow focus:drop-shadow-lg"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
                <div className="absolute right-3 bottom-3">
                    <EnterButton />
                </div>
            </div>
        </div>
    );
};
