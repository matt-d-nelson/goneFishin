import { Button, Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import chroma from "chroma-js";
import LureSVG from "../LureSVG/LureSVG";

function Design(props) {
  const [bodyColor, setBodyColor] = useState("#00FF00");
  const [bodyShadeColor, setBodyShadeColor] = useState(
    chroma("#00FF00").darken()
  );
  const [finColor, setFinColor] = useState("#FF0000");
  const [dorsalColor, setDorsalColor] = useState("#3C2210");
  const [eyeColor, setEyeColor] = useState("#FFFF00");

  const handleBodyColorChange = (event) => {
    setBodyColor(event.target.value);
    setBodyShadeColor(chroma(event.target.value).darken());
  };

  const handleFinColorChange = (event) => {
    setFinColor(event.target.value);
  };

  const handleDorsalColorChange = (event) => {
    setDorsalColor(event.target.value);
  };

  const handleEyeColorChange = (event) => {
    setEyeColor(event.target.value);
  };

  return (
    <div>
      <h2>Design</h2>
      <p>Props: {JSON.stringify(props)}</p>
      <Grid container spacing={2}>
        {/* //------------TEXT INPUTS------------// */}
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <TextField fullWidth label="title" />
            </Grid>
            <Grid item>
              <TextField fullWidth label="description" minRows={8} multiline />
            </Grid>
          </Grid>
        </Grid>
        {/* //------------COLOR INPUTS------------// */}
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Button component="label">
                <input
                  type="color"
                  onChange={handleBodyColorChange}
                  value={bodyColor}
                />
                Body
              </Button>
            </Grid>
            <Grid item>
              <Button component="label">
                <input
                  type="color"
                  onChange={handleFinColorChange}
                  value={finColor}
                />
                Fins
              </Button>
            </Grid>
            <Grid item>
              <Button component="label">
                <input
                  type="color"
                  onChange={handleDorsalColorChange}
                  value={dorsalColor}
                />
                Dorsal
              </Button>
            </Grid>
            <Grid item>
              <Button component="label">
                <input
                  type="color"
                  onChange={handleEyeColorChange}
                  value={eyeColor}
                />
                Eyes
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* //------------LURE SVG FLAT------------// */}
        <Grid item>
          <Grid container direction="column">
            <LureSVG
              bodyColor={bodyColor}
              bodyShadeColor={bodyShadeColor}
              finColor={finColor}
              dorsalColor={dorsalColor}
              eyeColor={eyeColor}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Design;
