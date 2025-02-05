
type OptionDropdownProps = {
    value: string | null;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}

export const OptionDropdown = ({ value, onChange, options }: OptionDropdownProps) => {
    return (
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
    );
};