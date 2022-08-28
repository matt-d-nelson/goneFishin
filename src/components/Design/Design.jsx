//---------------------imports---------------------//
import {
  Button,
  ButtonGroup,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import chroma from "chroma-js";
import LureSVG from "../LureSVG/LureSVG";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";

function Design() {
  //---------------------imported methods---------------------//
  const dispatch = useDispatch();
  const history = useHistory();

  //---------------------reducer state---------------------//
  const user = useSelector((store) => store.user);

  //---------------------local state---------------------//

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

  //lure SVG ref
  const fishSVG = useRef();

  //---------------------event handlers---------------------//
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

  // text/checkbox inputs
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const updatePublic = (event) => {
    setPublicDesign(event.target.checked);
  };

  // button clicks
  const onCancel = () => {
    history.push("/home");
  };

  const PreviewModel = () => {
    // similar to onSave function, but instead of converting the
    // canvas element into a blob, it creates a url that is passed
    // to the preview modal
    const svg = fishSVG.current.innerHTML;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const objectUrl = URL.createObjectURL(blob);
    let img = document.createElement("img");
    img.src = objectUrl;
    const pngCanvas = document.createElement(`canvas`);
    pngCanvas.width = 360;
    pngCanvas.height = 504;
    let ctx = pngCanvas.getContext("2d");
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      const url = pngCanvas.toDataURL("img/png");
      dispatch({
        type: "OPEN_MODAL",
        payload: { type: "preview", open: true, texture: url },
      });
    };
  };

  const onSave = () => {
    // check to see if a user is logged in
    if (user.id === undefined) {
      dispatch({
        type: "OPEN_MODAL",
        payload: { type: "register", open: true },
      });
      // if not open a register window
    } else {
      // get the current svg HTML
      const svg = fishSVG.current.innerHTML;
      // create a blob of raw data from the svg
      const blob = new Blob([svg], { type: "image/svg+xml" });
      // create a URL for the svg blob data
      const objectUrl = URL.createObjectURL(blob);
      // create a new <image> element
      let img = document.createElement("img");
      // set it's source to the url of the svg blob
      img.src = objectUrl;
      // create a new <canvas> element
      const pngCanvas = document.createElement(`canvas`);
      // define its width and height to that of the svg (hard coded)
      pngCanvas.width = 360;
      pngCanvas.height = 504;
      // set the canvas drawing context
      let ctx = pngCanvas.getContext("2d");
      // when the svg blob is loaded into the img element
      img.onload = function () {
        // draw the img (sourced with the svg blob) to the canvas
        ctx.drawImage(img, 0, 0);
        // convert the drawn image to a blob of data
        pngCanvas.toBlob(function (blob) {
          // create form data and append it with current values
          const newDesign = new FormData();
          newDesign.append("designPng", blob, "design.png");
          newDesign.append("bodyColor", bodyColor);
          newDesign.append("finColor", finColor);
          newDesign.append("dorsalColor", dorsalColor);
          newDesign.append("eyeColor", eyeColor);
          newDesign.append("description", description);
          newDesign.append("title", title);
          newDesign.append("public", publicDesign);

          // send saga request to save the design to DB
          dispatch({ type: "SAVE_DESIGN", payload: newDesign });
          dispatch({
            type: "OPEN_MODAL",
            payload: {
              type: "success",
              open: "true",
              success: "Your Design Was Saved",
            },
          });
          // sends the user back to their home page after saving updated design
          history.push("/home");
        });
      };
    }
  };

  //---------------------JSX return---------------------//
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Design</h2>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} align="right">
          <Grid container direction="column">
            {/* //------------LURE SVG FLAT------------// */}
            <Grid item>
              <div ref={fishSVG}>
                <LureSVG
                  bodyColor={bodyColor}
                  bodyShadeColor={bodyShadeColor}
                  finColor={finColor}
                  dorsalColor={dorsalColor}
                  eyeColor={eyeColor}
                />
              </div>
            </Grid>
            <Grid item>
              <Button onClick={PreviewModel} style={{ marginRight: "110px" }}>
                3D Preview
              </Button>
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
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onSave}>Save</Button>
            <Button component="label">
              Public:
              <Checkbox label="public" onChange={updatePublic} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Design;
