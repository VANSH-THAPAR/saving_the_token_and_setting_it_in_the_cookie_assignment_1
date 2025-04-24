
const jwt = require('jsonwebtoken');
const SECRET = 'supersecret'; // JWT signing key

const encrypt = (payload) => {
  const str = JSON.stringify(payload);
  const encrypted = Buffer.from(str).toString('base64');
  const token = jwt.sign({ data: encrypted }, SECRET);
  return token;
};

const decrypt = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    const decrypted = Buffer.from(decoded.data, 'base64').toString('utf8');
    return JSON.parse(decrypted);
  } catch (e) {
    console.error('Failed to decrypt:', e.message);
    return null;
  }
};

const token = encrypt({ msg: 'Hello World' });
const result = decrypt(token);

if (result && result.msg === 'Hello World') {
  console.log('Success');
} else {
  console.log('Failed');
}

module.exports = {
  encrypt,
  decrypt,
};