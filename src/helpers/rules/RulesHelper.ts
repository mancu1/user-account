const Rules = {
  required(value?: string): boolean | string {
    return !!value || "required";
  },

  password(value?: string): boolean | string {
    const pattern = /^(?=.*[a-z])(?=.*[0-9])(?=.{5,})/;
    if (!value) return "required";
    return (
      pattern.test(value) ||
      "Min. 5 characters with at least one capital letter, a number"
    );
  },
  passwordCheck(value?: string, pass?: string): boolean | string {
    return (
      (typeof value === "string" &&
        typeof pass === "string" &&
        value === pass) ||
      "Passwords must match"
    );
  }
};

export default Rules;
