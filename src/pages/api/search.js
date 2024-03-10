import prisma from "@/lib/prisma";

export default async function GET(req, res) {
  try {
    if (req.method === "GET") {
      const { query } = req.query;

      if (!query) res.status(400).json({ msg: "Query not found" });

      let accounts = await prisma.account.findMany({
        where: {
          username: {
            contains: query,
          },
        },
      });

      res.status(200).json({ query, accounts });
    }
  } catch {
    res.status(400).json({ msg: err });
  }
}
