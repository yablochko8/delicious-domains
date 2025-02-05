
type OptionDropdownProps = {
    question: string;
    value: string | null;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}

export const OptionDropdown = ({ question, value, onChange, options }: OptionDropdownProps) => {
    return (
        <div className="space-y-2">
            <div>
                <h3>{question}</h3>
            </div>
            <div>
                <select
                    className="select select-accent w-full max-w-500"
                    value={value || ""}
                    onChange={onChange}
                >
                    <option value="" disabled>select</option>
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};