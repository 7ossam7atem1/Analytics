import { Button, TextField } from '@mui/material';

import axios from 'axios';

export default function addWebsite() {
  const addWebsite = async () => {
    const websiteUrl = document.getElementById('outlined-basic').value;
    try {
      const res = await axios.post('/api/websites', {
        url: websiteUrl,
      });
      alert(`Website Added Successfully`);
    } catch (e) {
      alert('Error adding Website');
    }
  };

  return (
    <div>
      <h3>Add Websites</h3>
      <TextField id="outlined-basic" label="Website Url" variant="outlined" />
      <br></br>
      <Button
        style={{ marginTop: '10px' }}
        onClick={addWebsite}
        variant="contained"
      >
        Add Website
      </Button>
    </div>
  );
}
