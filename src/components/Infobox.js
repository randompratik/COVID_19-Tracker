import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function Infobox({ title, cases, total }) {
  return (
    <Card className="Infobox">
      <CardContent>
        <Typography className="Infobox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="Infobox__cases">TODAY :{cases}</h2>
        <Typography className="Infobox__total" color="textSecondary">
          TOTAL CASES :{total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Infobox;
