//------------------IMPORTS------------------//
import {
  Button,
  ButtonGroup,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useState } from "react";
import chroma from "chroma-js";
import LureSVG from "../LureSVG/LureSVG";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Design() {
  //------------------OBJECTS------------------//
  const dispatch = useDispatch();
  const history = useHistory();

  //------------------REDUCER STATE------------------//
  const user = useSelector((store) => store.user);

  //------------------LOCAL STATE------------------//
  // lure colors
  const [bodyColor, setBodyColor] = useState("#00FF00");
  const [bodyShadeColor, setBodyShadeColor] = useState(
    chroma("#00FF00").darken()
  );
  const [finColor, setFinColor] = useState("#FF0000");
  const [dorsalColor, setDorsalColor] = useState("#3C2210");
  const [eyeColor, setEyeColor] = useState("#FFFF00");

  // inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publicDesign, setPublicDesign] = useState(false);

  //------------------EVENT HANDLERS------------------//
  // lure colors
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

  // text inputs
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // button clicks
  const onCancel = () => {
    history.push("/home");
  };
  const onSave = () => {
    // TODO - input validation
    const newDesign = {
      user_id: user.id,
      svg_colors: {
        bodyColor: bodyColor,
        finColor: finColor,
        dorsalColor: dorsalColor,
        eyeColor: eyeColor,
      },
      description: description,
      title: title,
      public: publicDesign,
    };
    console.log(newDesign);
    // send saga request
    dispatch({ type: "SAVE_DESIGN", payload: newDesign });
    // TODO - navigate to /home after modal confirmation
  };
  const updatePublic = (event) => {
    setPublicDesign(event.target.checked);
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
              <TextField label="title" onChange={handleTitleChange} />
            </Grid>
            <Grid item align="left">
              <TextField
                label="description"
                minRows={8}
                multiline
                onChange={handleDescriptionChange}
              />
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
              <Button onClick={onCancel}>Cancel</Button>
              <Button onClick={onSave}>Save</Button>
              <Button component="label">
                Public:
                <Checkbox label="public" onChange={updatePublic} />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Design;
