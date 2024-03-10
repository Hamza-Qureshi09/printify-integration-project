import { GetAllPrintifyProducts } from "@/http";

export default async function GET(req, res) {
  try {
    if (req.method === "GET") {
      const { limit } = req.query;
      const response = await GetAllPrintifyProducts(req.query?.limit || 4);
      if (response.status === 200) {
        return res.status(200).json({ success: true, data: response?.data });
      }
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}
