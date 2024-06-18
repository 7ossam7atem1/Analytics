import express from 'express';
import Event from '../models/event.js';
import { Op } from 'sequelize';
import sequelize from '../db/db.js';

const router = express.Router();

router.get('/api/reports', async (req, res) => {
  const websiteId = req.query.websiteId;
  const type = req.query.type;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const events = await Event.findAndCountAll({
    where: {
      websiteId,
      type,
      //
      createdAt: {
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      },
    },
  });
  res.json(events);
});

export default router;
