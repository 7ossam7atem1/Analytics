import { Grid, Paper } from '@mui/material';
import Chart from '../../reports/chart';

export default function SingleWebsite({ website }) {
  return (
    <Grid item xs={12}>
      <h2>{website.url}</h2>
      <Paper sx={{ p: 2, m: 1, display: 'flex', flexDirection: 'column' }}>
        <textarea
          value={`<script type="text/javascript">const WEBSITE_ID="${
            website.id
          }"</script><script type="text/javascript" src="${
            import.meta.env.VITE_SCRIPT_URL
          }"></script>`}
        ></textarea>
        <Chart websiteId={website.id} type={'0'} title={'View Report'} />
      </Paper>
      <Paper sx={{ p: 2, m: 1, display: 'flex', flexDirection: 'column' }}>
        <Chart websiteId={website.id} type={'1'} title={'Clicks Report'} />
      </Paper>
    </Grid>
  );
}
