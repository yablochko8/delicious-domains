export const InputMultiCheckbox = ({
  tld,
  checked,
  onChange,
}: {
  tld: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <button
      className={`
                pill-button
                ${checked ? "selector-button-selected" : "selector-button"}`}
      onClick={() => onChange(!checked)}
    >
      {tld}
    </button>
  );
};
