
export const VibeButton = ({ vibe, onClick }: { vibe: string, onClick: (vibe: string) => void }) => {
    return (
        <button className="btn btn-xs btn-outline btn-info" onClick={() => onClick(vibe)}>
            {vibe}
        </button>
    );
};