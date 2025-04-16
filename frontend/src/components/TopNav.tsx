import { WEBSITE_NAME } from "../config";
import { ActionButtons } from "./ActionButtons";
import { AboutButton } from "./Buttons";

export const TopNav = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 z-50">
            <div className="navbar max-w-7xl mx-auto w-full px-4">
                <div className="navbar-start justify-start w-full">
                    <img src="/logo.png" alt="dapper domains" className="w-10 h-10" />
                    <a className="btn btn-ghost text-xl text-slate-600">{WEBSITE_NAME}</a>
                </div>
                <div className="navbar-end md:hidden">
                    <AboutButton />
                </div>
                <div className="navbar-end gap-2 hidden md:flex">
                    <AboutButton />
                    <ActionButtons />
                </div>
            </div>
        </div>
    );
};
