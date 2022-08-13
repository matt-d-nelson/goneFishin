import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function Edit(props) {
  const dispatch = useDispatch();

  const thisId = useParams();

  const design = useSelector((store) => store.editDesign);

  useEffect(() => {
    // get design info for this design
    dispatch({ type: "GET_DESIGN", payload: thisId.id });
  }, []);

  return (
    <div>
      <h2>Edit</h2>
      <p>Props: {JSON.stringify(design)}</p>
    </div>
  );
}

export default Edit;
