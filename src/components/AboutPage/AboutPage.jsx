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
       <Card sx={{ ml:50, mr:50 }}>
      <CardContent>
   <CardHeader> Red Wing Lure Company </CardHeader>
   The Chroma Lure Printer was born out of a desire to better understand the impact lure color has on catching fish. Whether helping fishermen in that pursuit, exploring their creativity, or creating personalized keepsakes, the Chroma Lure Printer and the web-based Lure Designer can make fishing more interesting, personal, and memorable without the need for expensive tools
and complicated techniques. Anyone can create their own custom-designed fishing lures with
ease and efficiency.
      </CardContent>
      <CardActions>
        <Button sx={{ml:45}}onClick={startDesign} variant='contained' size="small">Start Designing</Button>
      </CardActions>
    </Card>
    </div>
  );
}

export default AboutPage;
