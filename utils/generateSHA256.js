import crypto from "crypto";

const generateSHA256 = (string) => {
  return crypto.createHash("sha256").update(string).digest("hex");
};

export default generateSHA256;
