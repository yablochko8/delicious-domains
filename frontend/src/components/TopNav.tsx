import { ActionButtons } from "./ActionButtons";

export const TopNav = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl text-slate-600">delicious.domains</a>
            </div>
            <div className="navbar-center hidden lg:flex">
            </div>
            <div className="navbar-end gap-2 hidden md:flex">
                <ActionButtons />
            </div>

        </div >
    );
};
