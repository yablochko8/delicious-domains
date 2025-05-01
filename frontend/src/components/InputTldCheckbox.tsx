export const InputTldCheckbox = ({ tld, checked, onChange }: { tld: string, checked: boolean, onChange: (checked: boolean) => void }) => {
    return (
        <div
            className={`
                btn btn-sm
                cursor-pointer 
                rounded-lg 
                px-3 
                h-7 
                text-sm 
                flex items-center
                transition-colors 
                border-1
                border-[#2A2A304D]
                font-normal
                ${checked ? 'bg-neutral text-white' : 'bg-transparent hover:bg-gray-100'}`}
            onClick={() => onChange(!checked)}
        >
            {tld}
        </div>
    )
}


