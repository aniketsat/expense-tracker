const generateUsername = (firstName, lastName) => {
    let username = firstName.toLowerCase() + lastName.toLowerCase();
    // append random number to username
    username += Math.floor(Math.random() * 1000);
    return username;
}

module.exports = { generateUsername };