import { evaluateFunction } from "../helpers/evaluateFunction";

describe("Password Evaluation Tests", () => {
  test("Correct password", () => {
    const { grade, passwordGrade, messages } = evaluateFunction(
      "TeSt123**",
      "testUser"
    );
    expect(grade).toBe("Strong");
    expect(passwordGrade).toBe(10); // 1 point for each lowercase, uppercase, number, special character, 2 points for uncommon password, 3 points for not containing username = 10
    expect(messages.length).toBe(0);
  });

  test("Password length < 8", () => {
    const { grade, passwordGrade, messages } = evaluateFunction(
      "joe12",
      "testUser"
    );
    expect(grade).toBe("Weak");
    expect(passwordGrade).toBe(0); // check if length is less than 8, if so, passwordGrade should be 0
    expect(messages).toContain("Password must be at least 8 characters long.");
  });

  test("Missing uppercase letter", () => {
    const { grade, passwordGrade, messages } = evaluateFunction(
      "joedoe123**", // lowercase 1, no uppercase -1, number 1, special character 1, uncommon 2, not a part of username 3,  length 1 = 9
      "testUser"
    );
    expect(grade).toBe("Strong");
    expect(passwordGrade).toBe(9);
    expect(messages).toContain(
      "Password must contain at least one uppercase letter."
    );
  });

  test("Missing lowercase letter", () => {
    const { grade, passwordGrade, messages } = evaluateFunction(
      "JOEDOE123**", // no lowercase -1, uppercase 1, number 1,  special character 1, uncommon 2, not a part of username 3,  length 1 = 9
      "testUser"
    );
    expect(grade).toBe("Strong");
    expect(passwordGrade).toBe(9);
    expect(messages).toContain(
      "Password must contain at least one lowercase letter."
    );
  });

  test("Missing digit", () => {
    const { grade, passwordGrade, messages } = evaluateFunction(
      "JoeDoe****", // lowercase 1, uppercase 1,  no number -1, special character 1, uncommon 2, not a part of username 3,  length 1 = 9
      "testUser"
    );
    expect(grade).toBe("Strong");
    expect(passwordGrade).toBe(9);
    expect(messages).toContain("Password must contain at least one number.");
  });

  test("Missing special character", () => {
    const { grade, passwordGrade, messages } = evaluateFunction(
      "JoeDoe123567", // lowercase 1, uppercase 1,  number 1, no special character -1, uncommon 2, not a part of username 3,  length 1 = 9
      "testUser"
    );
    expect(grade).toBe("Strong");
    expect(passwordGrade).toBe(9);
    expect(messages).toContain(
      "Password must contain at least one special character."
    );
  });

  test("Password contains part of the username", () => {
    const { grade, passwordGrade, messages } = evaluateFunction(
      "testUser123*", // lowercase 1, uppercase 1, number 1, special character 1, uncommon 2, part of username -3,  length 1 = 7
      "testUser"
    );
    expect(grade).toBe("Medium");
    expect(passwordGrade).toBe(7);
    expect(messages).toContain(
      "Password cannot contain any part of your username."
    );
  });

  test("Common password", () => {
    const { grade, passwordGrade, messages } = evaluateFunction(
      "HelloWorld1!", // lowercase 1, uppercase 1, number 1, special character 1, is common -2, not a part of username 3,  length 1 = 8
      "testUser"
    );
    expect(grade).toBe("Medium");
    expect(passwordGrade).toBe(8);
    expect(messages).toContain("Password is too common.");
  });

  test("Missing special character and number", () => {
    const { grade, passwordGrade, messages } = evaluateFunction(
      "JoeDoeeeeeee", // lowercase 1, uppercase 1,  number -1, no special character -1, uncommon 2, not a part of username 3,  length 1 = 8
      "testUser"
    );
    expect(grade).toBe("Medium");
    expect(passwordGrade).toBe(8);
    expect(messages).toContain(
      "Password must contain at least one special character."
    );
    expect(messages).toContain("Password must contain at least one number.");
  });

  test("Missing special character and uppercase", () => {
    const { grade, passwordGrade, messages } = evaluateFunction(
      "joedoeeeeeee1", // lowercase 1, uppercase -1,  number 1, no special character -1, uncommon 2, not a part of username 3,  length 1 = 8
      "testUser"
    );
    expect(grade).toBe("Medium");
    expect(passwordGrade).toBe(8);
    expect(messages).toContain(
      "Password must contain at least one special character."
    );
    expect(messages).toContain(
      "Password must contain at least one uppercase letter."
    );
  });
});
