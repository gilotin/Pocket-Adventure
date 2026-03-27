import type React from "react";
import styles from "../register//Register.module.css";
import type { AuthMode, Character } from "../../types/gameTypes";
import { ACCOUNT_KEY, CHARACTER_KEY } from "../../constants/gameConstants";

type RegisterProps = {
    setAuthMode: (value: AuthMode) => void;
    setAuthError: (value: string | null) => void;
};

export function Register({ setAuthMode, setAuthError }: RegisterProps) {
    const handleAuthNavigation = (mode: AuthMode) => {
        setAuthMode(mode);
    };

    const registerSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const accountNameCheck = /^[A-Za-z0-9_]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const formData = new FormData(e.currentTarget);

        const accountName = formData.get("accountName");
        const email = formData.get("email");
        const repeatEmail = formData.get("repeatEmail");
        const password = formData.get("password");
        const repeatPassword = formData.get("repeatPassword");
        const characterName = formData.get("characterName");

        if (
            typeof accountName !== "string" ||
            typeof email !== "string" ||
            typeof repeatEmail !== "string" ||
            typeof password !== "string" ||
            typeof repeatPassword !== "string" ||
            typeof characterName !== "string"
        ) {
            setAuthError("No empty inputs allowed!");
            return;
        }

        const trimmedAccountName = accountName.trim();
        const trimmedEmail = email.trim();
        const trimmedRepeatEmail = repeatEmail.trim();
        const trimmedPassword = password.trim();
        const trimmedRepeatPassword = repeatPassword.trim();
        const trimmedCharacterName = characterName.trim();

        if (
            trimmedAccountName === "" ||
            trimmedEmail === "" ||
            trimmedRepeatEmail === "" ||
            trimmedPassword === "" ||
            trimmedRepeatPassword === "" ||
            trimmedCharacterName === ""
        ) {
            setAuthError("No empty inputs allowed!");
            return;
        }

        if (trimmedAccountName.length < 6 || trimmedPassword.length < 6) {
            setAuthError("account and password must contain at least 6 characters!");
            return;
        }

        if (!trimmedAccountName.match(accountNameCheck)) {
            setAuthError("You can use only letters, numbers and underscore for account name!");
            return;
        }

        if (!trimmedEmail.match(emailRegex)) {
            setAuthError("Not Valid e-mail address!");
            return;
        }

        if (trimmedEmail !== trimmedRepeatEmail) {
            setAuthError("Both emails must match!");
            return;
        }

        if (trimmedPassword !== trimmedRepeatPassword) {
            setAuthError("Both passwords must match!");
            return;
        }

        if (trimmedAccountName == trimmedPassword) {
            setAuthError("Account name and password must be different!");
            return;
        }

        const normalizedName = trimmedAccountName.toLocaleLowerCase();

        const accountData = {
            accountName: normalizedName,
            profileName: trimmedAccountName,
            email: trimmedEmail,
        };

        const characterData: Character = {
            name: characterName,
            gold: 100,
            totalExperience: 0,
        };

        localStorage.setItem(ACCOUNT_KEY, JSON.stringify(accountData));
        localStorage.setItem(CHARACTER_KEY, JSON.stringify(characterData));

        setAuthError(null);
        setAuthMode("login");
    };

    return (
        <>
            <div className={styles.registerWrapper}>
                <form
                    className={styles.registerFormCard}
                    method="POST"
                    onSubmit={registerSubmitHandler}
                >
                    <h1 className={styles.formHeader}>Register</h1>

                    <label htmlFor="accountName">Account: </label>
                    <input type="text" name="accountName" />

                    <label htmlFor="email">Email Address: </label>
                    <input type="email" name="email" />

                    <label htmlFor="repeatEmail">Repeat email address: </label>
                    <input type="text" name="repeatEmail" />

                    <label htmlFor="characterName">Create your character:</label>
                    <input type="text" name="characterName" />

                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" />

                    <label htmlFor="repeatPassword">Repeat Password: </label>
                    <input type="password" name="repeatPassword" />

                    <button className={styles.registerButton} type="submit">
                        Register
                    </button>
                </form>
                <button
                    className={styles.formNavigation}
                    onClick={() => handleAuthNavigation("register")}
                >
                    Are you registered?
                </button>{" "}
                <button
                    className={styles.formNavigation}
                    onClick={() => handleAuthNavigation("menu")}
                >
                    return to menu
                </button>
            </div>
        </>
    );
}
export { CHARACTER_KEY };
