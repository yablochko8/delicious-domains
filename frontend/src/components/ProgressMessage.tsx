export const ProgressMessage = ({ domains }: { domains: string[] }) => {
    return <div>
        Gathering scores for {domains.length} domains...
        {domains.map((domain) => (
            <div key={domain}>{domain}</div>
        ))}
    </div>;
};
