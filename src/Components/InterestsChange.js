import * as React from "react";
import Chip from "@mui/material/Chip";

export const InterestsChange = (props) => {
  const interests = props.interests;

  return (
    <div className="flex flex-row my-4">
      <Chip
        label={interests}
        className="bg-chips text-white Font-Inter font-semibold text-center hover:bg-chips-inactive mx-2"
      />
    </div>
  );
};
