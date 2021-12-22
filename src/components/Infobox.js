import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./Infobox.css"

function Infobox({ title, cases, total }) {
  return (
    <Card className="Infobox">
      <CardContent>
        <Typography className="Infobox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="Infobox__cases">Today: {cases}</h2>
        <Typography className="Infobox__total" color="textSecondary">
         Total: {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Infobox;
