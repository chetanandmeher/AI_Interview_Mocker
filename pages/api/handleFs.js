// filepath: /c:/NextJs-project/AI_Interview_Mocker_2/AI_Interview_Mocker/pages/api/handleFs.js
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { filePath } = req.body;

    try {
      const data = await fs.readFile(filePath, 'utf8');
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: 'File read error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}