import prisma from "@/lib/prisma";

export default async function GET(req, res) {
  try {
    if (req.method === "GET") {
      const { publicAddress, username } = req.query;

      if (!publicAddress && !username)
        res.status(400).json({ msg: "Public address or username not found" });

      let account;

      if (publicAddress) {
        account = await prisma.account.findUnique({
          where: {
            publicAddress,
          },
        });
      } else if (username) {
        account = await prisma.account.findUnique({
          where: {
            username,
          },
        });
      }

      res.status(200).json({ account });
    } else if (req.method === "POST") {
      const {
        publicAddress,
        username,
        occupation,
        instagramLink,
        twitterLink,
        bio,
        words,
      } = JSON.parse(req.body);

      const account = await prisma.account.upsert({
        where: {
          publicAddress,
        },
        update: {
          username,
          occupation,
          instagramLink,
          twitterLink,
          bio,
          words,
        },
        create: {
          publicAddress: publicAddress.toLowerCase(),
          username,
          occupation,
          instagramLink,
          twitterLink,
          bio,
          words,
        },
      });

      res.status(200).json({ account });
    }
  } catch {
    res.status(400).json({ msg: err });
  }
}
