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
  }
};

export default Rules;
