export const InputTldCheckbox = ({ tld, checked, onChange }: { tld: string, checked: boolean, onChange: (checked: boolean) => void }) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            <input
                type="checkbox"
                className="checkbox checkbox-success"
                checked={checked}
                onChange={() => onChange(!checked)}
            />
            <label
                className="label cursor-pointer flex items-center"
                onClick={() => onChange(!checked)}
            >
                {tld}
            </label>
        </div>
    )
}
