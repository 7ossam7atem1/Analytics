import Google from '@auth/express/providers/google';
import SequelizeAdapter from '@auth/sequelize-adapter';
import sequelize from '../db/db.js';
import { ExpressAuth, getSession } from '@auth/express';
import express from 'express';
const router = express.Router();

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: SequelizeAdapter(sequelize),
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};

router.use('/api/auth/*', ExpressAuth(authConfig));

export async function authSession(req, res, next) {
  res.locals.session = await getSession(req, authConfig);
  next();
}

router.use(authSession);
router.get('/api/session', (req, res) => {
  res.json(res.locals.session || {});
});

export default router;
