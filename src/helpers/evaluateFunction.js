import commonPasswords from "../assets/commonPasswords.json";

const isValidLength = (password) => password.length >= 8;
const hasUpperCase = (password) => /[A-Z]/.test(password);
const hasLowerCase = (password) => /[a-z]/.test(password);
const hasNumber = (password) => /\d/.test(password);
const hasSpecialCharacter = (password) =>
  /[!@#$%^&*(),.?":{}|<>]/.test(password);
const isNotCommonPassword = (password) =>
  !commonPasswords.some(
    (commonPassword) => commonPassword.toLowerCase() === password.toLowerCase()
  );

const isDifferentFromUsername = (password, username) =>
  !password.toLowerCase().includes(username.toLowerCase());

export const evaluateFunction = (password, username) => {
  let passwordGrade = 0;
  let messages = [];

  if (isValidLength(password)) {
    passwordGrade += 1;
  } else {
    messages.push("Password must be at least 8 characters long.");
    return { grade: "Weak", passwordGrade: 0, messages };
  }

  // for each lower case, upper case, number, special character it gives 1 point
  // for uncommon password it gives 2 points
  // for not containing username it gives 3 points

  if (hasLowerCase(password)) {
    passwordGrade += 1;
  } else {
    messages.push("Password must contain at least one lowercase letter.");
  }

  if (hasUpperCase(password)) {
    passwordGrade += 1;
  } else {
    messages.push("Password must contain at least one uppercase letter.");
  }

  if (hasNumber(password)) {
    passwordGrade += 1;
  } else {
    messages.push("Password must contain at least one number.");
  }

  if (hasSpecialCharacter(password)) {
    passwordGrade += 1;
  } else {
    messages.push("Password must contain at least one special character.");
  }

  if (isNotCommonPassword(password)) {
    passwordGrade += 2;
  } else {
    messages.push("Password is too common.");
  }

  if (isDifferentFromUsername(password, username)) {
    passwordGrade += 3;
  } else {
    messages.push("Password cannot contain any part of your username.");
  }

  const grade =
    passwordGrade >= 9 ? "Strong" : passwordGrade >= 6 ? "Medium" : "Weak";

  return { grade, passwordGrade, messages };
};
