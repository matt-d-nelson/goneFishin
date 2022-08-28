// import "aframe";
import "@google/model-viewer";
import { useEffect, useRef } from "react";

function Model(props) {
  useEffect(() => {
    const viewer = document.getElementById(props.reference);

    viewer.addEventListener("load", async () => {
      viewer.model.materials[0].pbrMetallicRoughness.baseColorTexture.texture.source.setURI(
        props.texture
      );
    });
  }, []);

  return (
    <div style={{ height: "200px" }}>
      <model-viewer
        id={props.reference}
        src={props.model}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        camera-orbit="-33.96deg 85.37deg auto"
        shadow-intensity="1"
        alt="Lure model"
      ></model-viewer>
    </div>
  );
}

export default Model;
