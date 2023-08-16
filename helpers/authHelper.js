import bcrypt from "bcrypt";

// implementing hashing password 
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); //created hashed pass
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

// to compare current pass with encrypted pass
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
