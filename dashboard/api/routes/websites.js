import express from 'express';
import Website from '../models/website.js';
const router = express.Router();

router.post('/api/websites', async (req, res) => {
  const userId = res.locals.session.userId;
  const { url } = req.body;
  const website = await Website.findOrCreate({
    where: {
      url,
      userId,
    },
  });
  res.json(website);
});

router.get('/api/websites', async (req, res) => {
  const userId = res.locals.session.userId;
  const websites = await Website.findAll({
    where: {
      userId,
    },
  });
  res.json(websites);
});

export default router;