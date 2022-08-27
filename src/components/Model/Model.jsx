import "aframe";
import { Entity, Scene } from "aframe-react";

function Model(props) {
  const lureGTFL = {
    asset: {
      generator: "Khronos glTF Blender I/O v3.2.43",
      version: "2.0",
    },
    scene: 0,
    scenes: [
      {
        name: "Scene",
        nodes: [0],
      },
    ],
    nodes: [
      {
        mesh: 0,
        name: "Mighty_Bigery",
        rotation: [0.7071068286895752, 0, 0, 0.7071067094802856],
      },
    ],
    materials: [
      {
        doubleSided: true,
        name: "Lure7.mtl",
        pbrMetallicRoughness: {
          baseColorTexture: {
            index: 0,
          },
          metallicFactor: 0,
          roughnessFactor: 0.5,
        },
      },
    ],
    meshes: [
      {
        name: "Mighty_Bigery",
        primitives: [
          {
            attributes: {
              POSITION: 0,
              NORMAL: 1,
              TEXCOORD_0: 2,
            },
            indices: 3,
            material: 0,
          },
        ],
      },
    ],
    textures: [
      {
        sampler: 0,
        source: 0,
      },
    ],
    images: [
      {
        mimeType: "image/png",
        name: "1661203566357design",
        uri: "1661203566357design.png",
      },
    ],
    accessors: [
      {
        bufferView: 0,
        componentType: 5126,
        count: 1542,
        max: [8.00802993774414, 6.972706317901611, 11.866649627685547],
        min: [-8.00802993774414, -43.13633728027344, -11.713778495788574],
        type: "VEC3",
      },
      {
        bufferView: 1,
        componentType: 5126,
        count: 1542,
        type: "VEC3",
      },
      {
        bufferView: 2,
        componentType: 5126,
        count: 1542,
        type: "VEC2",
      },
      {
        bufferView: 3,
        componentType: 5123,
        count: 8667,
        type: "SCALAR",
      },
    ],
    bufferViews: [
      {
        buffer: 0,
        byteLength: 18504,
        byteOffset: 0,
      },
      {
        buffer: 0,
        byteLength: 18504,
        byteOffset: 18504,
      },
      {
        buffer: 0,
        byteLength: 12336,
        byteOffset: 37008,
      },
      {
        buffer: 0,
        byteLength: 17334,
        byteOffset: 49344,
      },
    ],
    samplers: [
      {
        magFilter: 9729,
        minFilter: 9987,
      },
    ],
    buffers: [
      {
        byteLength: 66680,
        uri: "lure.bin",
      },
    ],
  };

  return (
    <div>
      <p>3d</p>
      <Scene model-viewer="gltfModel: #lure; title: lure">
        <a-assets>
          <a-asset-item
            id="object"
            src="/model/lureObj/lure.obj"
          ></a-asset-item>
          <a-asset-item
            id="material"
            src="/model/lureObj/lure.mtl"
          ></a-asset-item>
          <a-asset-item id="lure" src="/model/lure.gltf"></a-asset-item>
        </a-assets>

        <Entity
          gltf-model="/model/lure.gltf"
          scale="0.1 0.1 0.1"
          material={{ color: "#FFC65D" }}
        />
        {/* <a-obj-model
          gltf-model="/model/lure.gltf"
          scale="0.1 0.1 0.1"
        ></a-obj-model> */}
      </Scene>
    </div>
  );
}

export default Model;
