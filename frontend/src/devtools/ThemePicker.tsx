import React from 'react';

export const ThemePicker = () => {
    const [theme, setTheme] = React.useState('light');



    const ThemeOption = ({ theme }: { theme: string }) => {
        return (
            <option value={theme.toLowerCase()}>{theme}</option>
        )
    }

    const ThemeOptions = [
        'Light',
        'Dark',
        'Cupcake',
        'Bumblebee',
        'Emerald',
        'Corporate',
        'Synthwave',
        'Retro',
        'Cyberpunk',
        'Valentine',
        'Halloween',
        'Garden',
        'Forest',
        'Aqua',
        'Lofi',
        'Pastel',
        'Fantasy',
        'Wireframe',
        'Black',
        'Luxury',
        'Dracula',
        'Cmyk',
        'Autumn',
        'Business',
        'Acid',
        'Lemonade',
        'Night',
        'Coffee',
        'Winter',
        'Dim',
        'Nord',
        'Sunset',
        'Caramellatte',
        'Abyss',
        'Silk'
    ]

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value;
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const handleNextTheme = () => {
        const currentIndex = ThemeOptions.findIndex(
            (t) => t.toLowerCase() === theme
        );
        const nextIndex = (currentIndex + 1) % ThemeOptions.length;
        const nextTheme = ThemeOptions[nextIndex].toLowerCase();
        setTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
    }

    return (
        <div className="flex flex-row gap-2">
            <select
                className="select select-bordered w-full max-w-xs"
                value={theme}
                onChange={handleThemeChange}
            >
                <option disabled>Pick a theme</option>
                {ThemeOptions.map((theme) => (
                    <ThemeOption key={theme} theme={theme} />
                ))}
            </select>
            <button className="btn btn-ghost" onClick={handleNextTheme}>Next Theme</button>
        </div >
    )
}