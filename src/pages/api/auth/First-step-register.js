import bcrypt from "bcrypt";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firstName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const registrationData = { firstName, email, hashedPassword };
  const cookieValue = JSON.stringify(registrationData);
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  };

  const serializedCookie = cookie.serialize(
    "registrationData",
    cookieValue,
    cookieOptions
  );

  res.setHeader("Set-Cookie", serializedCookie);
  res.status(200).json({ message: "Registration successful" });
}
