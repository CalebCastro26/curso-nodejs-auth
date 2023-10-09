const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = 'admin123';
  const myHash = '$2b$10$1N1eN/ptIMQrGdQnfIKjIuW.P0x2pNj/HAWbCxdLmSkIz.y.8Abve';
  const isMatch = await bcrypt.compare(myPassword, myHash);
  console.log(isMatch);
}

hashPassword();
