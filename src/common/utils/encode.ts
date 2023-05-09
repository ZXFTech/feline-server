import crypto from "crypto";
import fs from "fs";

export const generateKeyFiles = () => {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 520,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: "test",
    },
  });

  // Creating private key file
  fs.writeFileSync("private_key", keyPair.privateKey);
};
