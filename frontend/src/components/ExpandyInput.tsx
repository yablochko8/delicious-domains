import { useState } from "react";


type ExpandyInputProps = {
    question: string;
    subhead?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
}

export const ExpandyInput = ({ question, subhead, value, onChange, placeholder }: ExpandyInputProps) => {
    const [isFocused, setIsFocused] = useState(false);


    return (
        <div className="space-y-2">
            <div>
                <h3>{question}</h3>
                {subhead && <p className="text-sm text-gray-500">{subhead}</p>}
            </div>
            <div>
                <textarea
                    className="textarea textarea-accent w-full max-w-500 transition-all duration-200 ease-in-out"
                    style={{ height: isFocused ? '8rem' : '3rem' }}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
        </div>
    );
};
