//---------------------imports---------------------//
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
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
  const [bodyColor, setBodyColor] = useState("#7BAB6D");
  const [bodyShadeColor, setBodyShadeColor] = useState(
    chroma("#7BAB6D").darken()
  );
  const [finColor, setFinColor] = useState("#D0AC5D");
  const [dorsalColor, setDorsalColor] = useState("#D1691F");
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
      // if not open a register window
      dispatch({
        type: "OPEN_MODAL",
        payload: { type: "register", open: true },
      });
      // check to ensure a title is entered
    } else if (title === "") {
      dispatch({
        type: "OPEN_MODAL",
        payload: {
          type: "error",
          open: true,
          message: "Please enter a title for your design",
        },
      });
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
      // store a reference to the hidden grid img element
      let imgGrid = document.getElementById("grid");
      // create a new <canvas> element
      const pngCanvas = document.createElement(`canvas`);
      // define its width and height to that of the svg (hard coded)
      pngCanvas.width = 360;
      pngCanvas.height = 504;
      // set the canvas drawing context
      let ctx = pngCanvas.getContext("2d");
      // when the svg blob is loaded into the img element
      img.onload = function () {
        // draw the img (sourced with the grid) to the canvas
        ctx.drawImage(imgGrid, 0, 0);
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
          // success modal moved to saveDesign.saga.js
        });
      };
    }
  };

  //---------------------JSX return---------------------//
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Design</h1>
      {/* hidden grid png for saving lure design */}
      <img src="/image/LureGrid.png" id="grid" style={{ display: "none" }} />
      <div>
        <Card
          elevation={4}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "650px",
            minWidth: "650px",
            paddingTop: "20px",
            marginBottom: "20px",
          }}
        >
          <CardContent>
            <Grid container spacing={2} justifyContent="center">
              <Grid item align="center" xs={7}>
                {/* //------------LURE SVG FLAT------------// */}
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
              <Grid item xs={5}>
                {/* //------------COLOR INPUTS------------// */}

                <Grid item align="center">
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item align="center">
                      <Typography
                        variant="h5"
                        sx={{ textDecoration: "underline" }}
                      >
                        Body
                      </Typography>
                      <input
                        type="color"
                        onChange={handleBodyColorChange}
                        value={bodyColor}
                        name="body"
                        className="colorInput"
                      />
                    </Grid>
                    <Grid item align="center">
                      <Typography
                        variant="h5"
                        sx={{ textDecoration: "underline" }}
                      >
                        Eyes
                      </Typography>
                      <input
                        type="color"
                        onChange={handleEyeColorChange}
                        value={eyeColor}
                        className="colorInput"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item align="left">
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item align="center">
                      <Typography
                        variant="h5"
                        sx={{ textDecoration: "underline" }}
                      >
                        Fins
                      </Typography>
                      <input
                        type="color"
                        onChange={handleFinColorChange}
                        value={finColor}
                        className="colorInput"
                      />
                    </Grid>
                    <Grid item align="center">
                      <Typography
                        variant="h5"
                        sx={{ textDecoration: "underline" }}
                      >
                        Dorsal
                      </Typography>
                      <input
                        type="color"
                        onChange={handleDorsalColorChange}
                        value={dorsalColor}
                        className="colorInput"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container direction="column" spacing={2}>
                  {/* //------------TEXT INPUTS------------// */}
                  <Grid item align="center">
                    <TextField
                      label="title"
                      onChange={handleTitleChange}
                      value={title}
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center">
                    <TextField
                      label="description"
                      minRows={8}
                      multiline
                      onChange={handleDescriptionChange}
                      value={description}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* //------------BUTTONS------------// */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Grid container>
              <Button variant="contained" onClick={PreviewModel} sx={{ mr: 1 }}>
                3D Preview
              </Button>
              <Button variant="contained" sx={{ mr: 1 }} onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="contained" sx={{ mr: 1 }} onClick={onSave}>
                Save
              </Button>
              <Button component="label" variant="contained" sx={{ mr: 1 }}>
                Public:
                <Checkbox
                  label="public"
                  onChange={updatePublic}
                  checked={publicDesign}
                  color="secondary"
                  disableRipple
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Design;
