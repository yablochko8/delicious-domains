import { useState } from "react";


type ExpandyInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
}

export const ExpandyInput = ({ value, onChange, placeholder }: ExpandyInputProps) => {
    const [isFocused, setIsFocused] = useState(false);


    return (
        <textarea
            className="textarea textarea-accent w-full max-w-500 transition-all duration-200 ease-in-out"
            style={{ height: isFocused ? '8rem' : '3rem' }}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );
};