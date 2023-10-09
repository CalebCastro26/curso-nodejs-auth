const jwt = require('jsonwebtoken');

const secret = 'myLlaveSecretaquedeberiaestarenunavariabledeentorno';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NjMwMDM0Nn0.UPvEsXZ4zHc-tsgOWety-OkH44zjDHZsf-ufE0L4c-o';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
