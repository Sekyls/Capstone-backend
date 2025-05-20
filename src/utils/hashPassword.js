const bcrypt = require("bcrypt");

// ✅ Hash Password
async function hashPassword(password) {
  // Generate a salt with 10 rounds of hashing
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

// ✅ Compare Password (for login)
async function comparePassword(inputPassword, hashedPassword) {
  // Compare the plain password with the stored hashed password
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);

  return isMatch;
}

module.exports = {
  hashPassword,
  comparePassword,
};
