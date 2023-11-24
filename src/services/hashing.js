import bcrypt from "bcrypt";

/**
 * Function to hash password before sending to db
 * @param {number} saltRounds - number of rounds for salting
 * @param {string} password - password entered by the client
 */
export async function hashPass(saltRounds, password) {
  saltRounds = 6;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return
  // bcrypt.genSalt(saltRounds, function (err, salt) {
  //   bcrypt.hash(password, salt, function (err, hash) {
      
  //   });
  // });
}

/**
 * Function to match the password by the client and db
 * @param {string} password 
 * @param {string} hash 
 */
export async function verifyHash(password, hash) {
	const result = await bcrypt.compare(password, hash);
  return result;
}
