import { WEBSITE_NAME } from "../config";
import { ActionButtons } from "./ActionButtons";
import { AboutButton } from "./Buttons";

export const TopNav = () => {
    return (
        <div className="navbar fixed top-0 left-0 z-50">
            <div className="navbar max-w-7xl mx-auto w-full px-4">
                <div className="navbar-start justify-start w-full cursor-pointer gap-2">
                    <img src="/logo-transparent.png" alt={WEBSITE_NAME} className="w-8 h-8" />
                    <div className="subtle-topnav">{WEBSITE_NAME}</div>
                </div>
                <div className="navbar-end md:hidden">
                    <AboutButton />
                </div>
                <div className="navbar-end gap-2 hidden md:flex">
                    <ActionButtons />
                    <AboutButton />
                </div>
            </div>
        </div>
    );
};
