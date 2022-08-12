import {
  Button,
  ButtonGroup,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import chroma from "chroma-js";
import LureSVG from "../LureSVG/LureSVG";

function Design() {
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
    <div style={{ textAlign: "center" }}>
      <h2>Design</h2>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} align="right">
          <Grid container direction="column">
            {/* //------------LURE SVG FLAT------------// */}
            <Grid item>
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
        <Grid item xs={6}>
          <Grid container direction="column" spacing={2}>
            {/* //------------TEXT INPUTS------------// */}
            <Grid item align="left">
              <TextField label="title" />
            </Grid>
            <Grid item align="left">
              <TextField label="description" minRows={8} multiline />
            </Grid>
            {/* //------------COLOR INPUTS------------// */}
            <Grid item align="left">
              <label>
                <input
                  type="color"
                  onChange={handleBodyColorChange}
                  value={bodyColor}
                  name="body"
                />
                : Body
              </label>
            </Grid>
            <Grid item align="left">
              <label>
                <input
                  type="color"
                  onChange={handleFinColorChange}
                  value={finColor}
                />
                : Fins
              </label>
            </Grid>
            <Grid item align="left">
              <label>
                <input
                  type="color"
                  onChange={handleDorsalColorChange}
                  value={dorsalColor}
                />
                : Dorsal
              </label>
            </Grid>
            <Grid item align="left">
              <label>
                <input
                  type="color"
                  onChange={handleEyeColorChange}
                  value={eyeColor}
                />
                : Eyes
              </label>
            </Grid>
          </Grid>
        </Grid>
        {/* //------------BUTTONS------------// */}
        <Grid item>
          <Grid container>
            <ButtonGroup>
              <Button>Cancel</Button>
              <Button>Save</Button>
              <Button component="label">
                Public:
                <Checkbox label="public" />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Design;
