//---------------------imports---------------------//
import "@google/model-viewer";
import { useEffect } from "react";

function Model(props) {
  //---------------------use effect---------------------//
  // on mount
  useEffect(() => {
    // store element id for this model
    const viewer = document.getElementById(props.reference);
    // add event on load that replaces the model texture
    viewer.addEventListener("load", async () => {
      viewer.model.materials[0].pbrMetallicRoughness.baseColorTexture.texture.source.setURI(
        props.texture
      );
    });
  }, []);

  // on mount and on props.texture change
  // needed for toggling between "feed" and "my designs" in UserPage.jsx
  useEffect(() => {
    // store element id for this model
    const viewer = document.getElementById(props.reference);
    // check to see if the model is loaded
    if (typeof viewer.model != "undefined") {
      // if it is, replace its texture
      viewer.model.materials[0].pbrMetallicRoughness.baseColorTexture.texture.source.setURI(
        props.texture
      );
    }
  }, [props.texture]);

  //---------------------JSX return---------------------//
  return (
    <div style={{ height: "200px" }}>
      <model-viewer
        id={props.reference}
        src={props.model}
        ar
        ar-modes="webxr scene-viewer quick-look"
        interaction-prompt={props.interaction}
        camera-controls
        camera-orbit="-33.96deg 85.37deg auto"
        shadow-intensity="1"
        alt="Lure model"
      ></model-viewer>
    </div>
  );
}

export default Model;
