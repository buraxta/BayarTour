import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function TourItem({ imageUrl, description, name, price }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <div className="h-25 w-25">
          <CardMedia
            sx={{ height: 400, width: 300 }}
            component="img"
            image={imageUrl}
            alt="tour image"
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            <div className=" flex justify-between">
              {name}
              <p>${price}</p>
            </div>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
