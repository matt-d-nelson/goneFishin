// import "aframe";
import "@google/model-viewer";
import { useEffect, useRef } from "react";

function Model(props) {
  const fish = useRef();

  useEffect(() => {
    const viewer = document.getElementById("modelA");

    viewer.addEventListener("load", async () => {
      viewer.model.materials[0].pbrMetallicRoughness.baseColorTexture.texture.source.setURI(
        "/image/1661017133512design.png"
      );
    });
  }, []);

  return (
    <div>
      <p>3d</p>
      <model-viewer
        id="modelA"
        ref={fish}
        src="/model/lure.glb"
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
