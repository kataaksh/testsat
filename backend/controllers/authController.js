export const registerUser = (req, res) => {
    // Registration logic here
    res.status(200).send("User registered");
}

export const loginUser = (req, res) => {
    // Login logic here
    res.status(200).send("User loggedIn");
}

export const logOut = (req, res) => {
    // Logout logic here
    res.status(200).send("User loggedOut");
}