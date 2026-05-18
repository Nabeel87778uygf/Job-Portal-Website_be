export const validateRegister = ({ fullName, email, password }) => {
    if (!fullName || !email || !password) {
        return "All fields are required";
    }

    const passwordRegex =
        /^[A-Za-z][A-Za-z0-9@#$%^&*!]{6,15}$/;

    if (!passwordRegex.test(password)) {
        return "Invalid password format";
    }

    return null;
};