import { Card, CardHeader } from '@mui/material';
import React from 'react';
import {Box} from '@mui/material';

import {CardActions} from '@mui/material';
import {CardContent} from '@mui/material';
import {Button} from '@mui/material';

import {Typography} from '@mui/material';
import { useHistory } from "react-router-dom";
import './AboutPage.css'






function AboutPage() {

  const history = useHistory();

const startDesign = () => {
  console.log("in startDesign");
  history.push("/design");
};
  return (
    <div className="container">
       <Card sx={{ ml:70 }}>
      <CardContent>
      <Typography sx={{ fontSize: 28 }} >
        How To Design A Lure 
      </Typography>
      <Typography sx={{ fontSize: 20 }} >
         Step 1: Pick the Body color from the color picker
      </Typography>
      <Typography sx={{ fontSize: 20 }} >
         Step 2: Pick the Fin color from the color picker
      </Typography>
      <Typography sx={{ fontSize: 20 }} >
         Step 3: Pick the Dorsal color from the color picker
      </Typography>
      <Typography sx={{ fontSize: 20 }} >
         Step 4: Pick the Eye color from the color picker
      </Typography>
      <Typography sx={{ fontSize: 20 }} >
         Step 5: Enjoy!
      </Typography>
      
      </CardContent>
      <CardActions>
        <Button sx={{ml:22}}onClick={startDesign} variant='contained' size="small">Start Designing</Button>
      </CardActions>
    </Card>
    </div>
  );
}

export default AboutPage;
