import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function MovieItem({ movie }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={movie.title} />
      <CardMedia
        className={classes.media}
        image={movie.images.posterArt.url}
        title={movie.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {movie.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};
