import type { AccountData } from "../../../types/gameTypes";

type ProfilePanelProps = {
    accountData: AccountData;
    handleGameMenu: () => void;
};

export function ProfilePanel({ accountData, handleGameMenu }: ProfilePanelProps) {
    return (
        <section>
            <h1>Profile Panel</h1>
            <p>Profile name:{accountData?.profileName}</p>
            <p>Account Name: {accountData?.accountName}</p>
            <p>Email:{accountData?.email}</p>
            <button onClick={handleGameMenu}>back</button>
        </section>
    );
}
