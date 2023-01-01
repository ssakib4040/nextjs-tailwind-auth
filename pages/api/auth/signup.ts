import { NextApiRequest, NextApiResponse } from "next";
import { hashSync } from "bcrypt";

import connectDB from "../../../lib/conntection";
import User from "../../../models/Schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB().catch((error) => res.json({ error: "Connection failed" }));

  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "No form data" });

    const { email, password } = req.body;

    if (!email || !password)
      return res.status(404).json({ error: "No email or password" });

    const isUserExists = await User.findOne({ email });

    if (isUserExists)
      return res.status(404).json({ error: "User already exists" });

    const hash = hashSync(password, 10);

    const user = new User({
      email,
      password: hash,
    });

    await user.save();
    return res.status(200).json({ message: "User created" });
  } else {
    return res.status(404).json({ error: "Method not allowed" });
  }
}
