import { Button } from "@material-ui/core";
import { useCallback } from "react";
import { useRef } from "react";

function downloadBlob(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

function LureSVG(props) {
  const fishSVG = useRef();

  const downloadSVG = useCallback(() => {
    const svg = fishSVG.current.innerHTML;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    downloadBlob(blob, "lure.svg");
  }, []);

  return (
    <div>
      <Button onClick={downloadSVG} style={{ marginRight: "110px" }}>
        download svg
      </Button>
      <div ref={fishSVG}>
        <svg
          width="360"
          height="504"
          viewBox="0 0 95.249998 133.35"
          version="1.1"
          id="svg535"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* -----------------------GRADIENT LEFT------------------------ */}
            {/* BODY SHADE LEFT GRADIENT */}
            <radialGradient
              id="bodyShadeGrad"
              cx="100%"
              cy="80%"
              r="100%"
              fx="100%"
              fy="60%"
            >
              <stop
                offset="20%"
                stopColor={props.bodyShadeColor}
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor={props.bodyShadeColor}
                stopOpacity="0"
              />
            </radialGradient>
            {/* BODY LEFT GRADIENT */}
            <radialGradient
              id="bodyGrad"
              cx="80%"
              cy="70%"
              r="70%"
              fx="100%"
              fy="70%"
            >
              <stop offset="70%" stopColor={props.bodyColor} stopOpacity="1" />
              {/* <stop offset="90%" stopColor={props.bodyColor} stopOpacity="0.9" /> */}
              <stop
                offset="100%"
                stopColor={props.bodyShadeColor}
                stopOpacity="1"
              />
            </radialGradient>
            {/* FIN LEFT GRADIENT */}
            <radialGradient
              id="finGrad"
              cx="80%"
              cy="30%"
              r="70%"
              fx="100%"
              fy="95%"
            >
              <stop offset="0%" stopColor={props.finColor} stopOpacity="0" />
              <stop offset="90%" stopColor={props.finColor} stopOpacity="1" />
            </radialGradient>
            {/* DORSAL LEFT GRADIENT */}
            <radialGradient
              id="dorsalGrad"
              cx="100%"
              cy="70%"
              r="70%"
              fx="100%"
              fy="40%"
            >
              <stop offset="0%" stopColor={props.dorsalColor} stopOpacity="1" />
              <stop
                offset="100%"
                stopColor={props.dorsalColor}
                stopOpacity="0.5"
              />
            </radialGradient>
            {/* -----------------------GRADIENT RIGHT------------------------ */}
            {/* FIN RIGHT GRADIENT */}
            <radialGradient
              id="finRightGrad"
              cx="20%"
              cy="30%"
              r="70%"
              fx="0%"
              fy="95%"
            >
              <stop offset="0%" stopColor={props.finColor} stopOpacity="0" />
              <stop offset="90%" stopColor={props.finColor} stopOpacity="1" />
            </radialGradient>
            {/* BODY SHADE RIGHT GRADIENT */}
            <radialGradient
              id="bodyShadeRightGrad"
              cx="5%"
              cy="80%"
              r="100%"
              fx="5%"
              fy="60%"
            >
              <stop
                offset="20%"
                stopColor={props.bodyShadeColor}
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor={props.bodyShadeColor}
                stopOpacity="0"
              />
            </radialGradient>
          </defs>
          <g id="layer1" style={{ display: "inline" }}>
            {/* DORSAL RIGHT GRADIENT */}
            <radialGradient
              id="dorsalRightGrad"
              cx="10%"
              cy="70%"
              r="70%"
              fx="10%"
              fy="40%"
            >
              <stop offset="0%" stopColor={props.dorsalColor} stopOpacity="1" />
              <stop
                offset="100%"
                stopColor={props.dorsalColor}
                stopOpacity="0.5"
              />
            </radialGradient>
            {/* -----------------------OBJECTS RIGHT------------------------ */}
            {/* BODY BACKGROUND LEFT*/}
            <path
              style={{
                display: "inline",
                fill: props.bodyColor,
                stroke: "#000000",
                strokeWidth: "0",
              }}
              d="M 25.107464,78.88948 C 24.043634,78.705484 18.705373,76.191712 18.145615,75.086095 17.579107,73.967143 17.878919,49.096053 18.304386,45.384282 18.935377,39.879531 30.948452,18.60488 37.99547,8.1770251 c 0.284953,-0.4216627 10.629603,0.03992 10.629603,0.03992 l 0.03032,70.6890689 c 0,0 -22.483904,0.167494 -23.547931,-0.01654 z"
              id="path594"
            />
            {/* FIN LEFT */}
            <path
              style={{
                fill: "url(#finGrad)",
                stroke: "#000000",
                strokeWidth: "0",
              }}
              d="m 48.623684,50.57305 c 0,0 -12.728466,-0.05882 -16.371093,1.422133 -6.209873,2.524691 -10.9054,8.296915 -13.561273,13.334404 -1.148469,2.178344 -1.218068,6.223511 -0.727604,8.731247 0.2303,1.177515 4.291658,4.47288 7.14375,4.828646 2.052488,0.256024 23.51622,-0.171384 23.51622,-0.171384 z"
              id="path970"
            />
            {/* BODY SHADE LEFT */}
            <path
              style={{
                fill: "url(#bodyShadeGrad)",
                stroke: "#000000",
                strokeWidth: "0",
              }}
              d="m 48.392581,8.1658921 c 0,0 -5.913916,-0.3880497 -6.135655,-0.01509 C 35.69168,36.019804 25.703264,60.580043 33.519154,74.426892 c 3.501649,6.20362 15.070081,4.396488 15.070081,4.396488 z"
              id="path1028"
            />
            {/* BODY FGRD LEFT */}
            <path
              style={{
                fill: props.bodyColor,
                stroke: "#000000",
                strokeWidth: "0",
              }}
              d="m 48.565979,78.802991 c 0,0 -10.383663,1.572819 -14.043041,-3.827439 -3.111297,-4.591438 -3.462417,-9.417733 -1.298231,-23.97861 2.175277,-14.635512 8.291674,-22.20491 11.461924,-42.8834969 0.06266,-0.4087007 3.869532,0.03307 3.869532,0.03307 z"
              id="path1031"
            />
            {/* DORSAL LEFT */}
            <path
              style={{
                fill: "url(#dorsalGrad)",
                stroke: "#000000",
                strokeWidth: "0",
              }}
              d="m 48.963542,78.919923 c 0,0 -3.083066,0.282932 -3.11035,-0.163705 C 44.409544,55.123605 47.911167,8.2471831 47.911167,8.2471831 l 1.028414,0.01225 z"
              id="path1034"
            />
            {/* EYE LEFT */}
            <ellipse
              style={{
                fill: "#000000",
                stroke: props.eyeColor,
                strokeWidth: "0.8",
              }}
              id="path10872"
              cx="40.461605"
              cy="70.026451"
              rx="1.9260963"
              ry="1.9247077"
            />
            {/* -----------------------OBJECTS RIGHT------------------------ */}
            {/* BODY BKG RIGHT */}
            <path
              style={{
                display: "inline",
                fill: props.bodyColor,
                stroke: "#000000",
                strokeWidth: "0",
              }}
              d="m 72.458496,78.951056 c 1.06383,-0.184 6.402091,-2.69777 6.961849,-3.80339 0.566508,-1.11895 0.266696,-25.99004 -0.158771,-29.70181 C 78.630583,39.941106 66.617508,18.666455 59.57049,8.2385995 c -0.284953,-0.421663 -10.629603,0.03992 -10.629603,0.03992 l -0.03032,70.6890665 c 0,0 22.483904,0.1675 23.547931,-0.0165 z"
              id="path594-0"
            />
            {/* FIN RIGHT */}
            <path
              style={{
                fill: "url(#finRightGrad)",
                stroke: "#000000",
                strokeWidth: "0",
              }}
              d="m 48.942276,50.634626 c 0,0 12.728466,-0.0588 16.371093,1.42213 6.209873,2.52469 10.9054,8.29692 13.561273,13.33441 1.148469,2.17834 1.218068,6.22351 0.727604,8.73124 -0.2303,1.17752 -4.291658,4.47288 -7.14375,4.82865 -2.052488,0.25602 -23.51622,-0.17139 -23.51622,-0.17139 z"
              id="path970-1"
            />

            {/* BODY SHADE RIGHT */}
            <path
              style={{
                fill: "url(#bodyShadeRightGrad)",
                stroke: "#000000",
                strokeWidth: "0",
              }}
              d="m 48.838195,8.2665225 c 0,0 5.913916,-0.38805 6.135655,-0.01509 6.565246,27.8690025 16.553662,52.4292435 8.737772,66.2760935 -3.501649,6.20361 -15.070081,4.39648 -15.070081,4.39648 z"
              id="path1028-8"
            />
            {/* BODY FGRD RIGHT */}
            <path
              style={{
                fill: props.bodyColor,
                stroke: "#000000",
                strokeWidth: "0",
              }}
              d="m 48.664797,78.903616 c 0,0 10.383663,1.57282 14.043041,-3.82743 3.111297,-4.59144 3.462417,-9.41774 1.298231,-23.97861 C 61.830792,36.462061 55.714395,28.892663 52.544145,8.2140755 c -0.06266,-0.408701 -3.869532,0.03307 -3.869532,0.03307 z"
              id="path1031-6"
            />
            {/* DORSAL RIGHT */}
            <path
              style={{
                fill: "url(#dorsalRightGrad)",
                stroke: "#000000",
                strokeWidth: "0",
              }}
              d="m 48.602418,78.981496 c 0,0 3.083066,0.28293 3.11035,-0.1637 C 53.156416,55.185176 49.654793,8.3087575 49.654793,8.3087575 l -1.028414,0.01225 z"
              id="path1034-9"
            />
            {/* EYE RIGHT */}
            <ellipse
              style={{
                fill: "#000000",
                stroke: props.eyeColor,
                strokeWidth: "0.8",
              }}
              id="path10872-9"
              cx="-57.104355"
              cy="70.088028"
              rx="1.9260963"
              ry="1.9247077"
              transform="scale(-1,1)"
            />

            {/* -----------------------ANCHOR POINTS------------------------ */}
            <ellipse
              style={{ display: "inline", fill: "#000000", strokeWidth: "0" }}
              id="path12149"
              cx="6.7494907"
              cy="7.7978988"
              rx="1.645185"
              ry="1.6483182"
            />
            <ellipse
              style={{ display: "inline", fill: "#000000", strokeWidth: "0" }}
              id="path12149-0"
              cx="88.101768"
              cy="7.8096986"
              rx="1.645185"
              ry="1.6483182"
            />
            <ellipse
              style={{ display: "inline", fill: "#000000", strokeWidth: "0" }}
              id="path12149-0-2"
              cx="87.026619"
              cy="122.68544"
              rx="1.645185"
              ry="1.6483182"
            />
            <ellipse
              style={{ display: "inline", fill: "#000000", strokeWidth: "0" }}
              id="path12149-0-2-3"
              cx="7.965209"
              cy="122.68907"
              rx="1.645185"
              ry="1.6483182"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default LureSVG;
