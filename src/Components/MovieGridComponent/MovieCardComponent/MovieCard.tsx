import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './MovieCard.css';
import { makeStyles, CardHeader, CardMedia, CardActions, Button, Collapse, Theme, createStyles, IconButton, Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
interface IMovieState {
    title: (string | null);
    release_date: (Date | null);
    vote_average: (number);
    vote_count: (number | null);
    poster_path: (number | null);
    overview: (string | null);
}

interface IMovieCardProps {
    MovieInfo: IMovieState;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
        },
        media: {
            width: "70%",
            margin: "0 auto"

        },
        title: {

        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
    }));
//https://image.tmdb.org/t/p/w185
function MovieCard(props: IMovieCardProps) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <Card className="MovieCardContainer">
                <CardActionArea>
                    <CardHeader
                        className={classes.title}
                        title={props.MovieInfo.title}
                        subheader={props.MovieInfo.release_date}
                    />
                    <CardMedia
                        component="img"
                        alt="No Poster Image"
                        className={classes.media}

                        image={`https://image.tmdb.org/t/p/w185${props.MovieInfo.poster_path}`}
                        title="Paella dish"
                    />
                    <CardContent>
                        {/* <Box component="fieldset" mb={3} borderColor="transparent"> */}
                        <Rating name="read-only" value={Math.floor(props.MovieInfo.vote_average) / 2} readOnly precision={0.5} />
                        <Box ml={2}>{props.MovieInfo.vote_average}
                            <Typography variant="body2" color="textSecondary" component="p">({props.MovieInfo.vote_count} counts)</Typography></Box>


                        {/* </Box> */}
                        {/* <Box height='100'> 
                            <Typography variant="body2" color="textSecondary" component="p" className="MovieCardDescription">
                                {props.MovieInfo.overview}
                            </Typography>
                        </Box> */}
                        <CardActions className="ViewOverview">

                            <Button onClick={handleExpandClick} size="small" color="primary">
                                View Overview
                           </Button>

                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >

                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                    </CardContent>

                </CardActionArea>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>{props.MovieInfo.overview}</Typography>

                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}

export default MovieCard