import { Scan } from "../models/Scan.js";

const getMyScans = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const scans = await Scan.find({ userId }).sort({ createdAt: -1 });

    // const formattedScans = scans.map(scan => ({
    //   id: scan._id.toString(),
    //   ...scan.toObject()
    // }));
    res.json({ scans });
  } catch (error) {
    console.error("Error fetching scan history:", error);
    res.status(500).json({ error: "Failed to fetch scan history" });
  } 
}

export { getMyScans }