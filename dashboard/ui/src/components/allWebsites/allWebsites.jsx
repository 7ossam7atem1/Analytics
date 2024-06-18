import { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Grid, Paper } from '@mui/material';
import Chart from '../reports/chart';
import SingleWebsite from '../websites/singleWebsite/singleWebsite';

export default function allWebsites() {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    const res = axios.get('/api/websites').then((res) => {
      setWebsites(res.data);
    });
  }, [setWebsites]);

  return (
    <>
      {websites.map((website) => (
        <SingleWebsite website={website} />
      ))}
    </>
  );
}
