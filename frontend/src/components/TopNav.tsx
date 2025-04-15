import { ActionButtons } from "./ActionButtons";
import { AboutButton } from "./Buttons";

export const TopNav = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 z-50">
            <div className="navbar max-w-7xl mx-auto w-full px-4">
                <div className="navbar-start justify-between w-full">
                    <a className="btn btn-ghost text-xl text-slate-600">delicious.domains</a>
                    <AboutButton />
                </div>

                <div className="navbar-end gap-2 hidden md:flex">
                    <ActionButtons />
                </div>
            </div>
        </div>
    );
};
