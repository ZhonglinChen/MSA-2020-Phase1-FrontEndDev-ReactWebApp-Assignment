import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './MovieCard.css';
import { makeStyles } from '@material-ui/core';

interface IMovieState {
    title: (string | null);
    release_date: (Date | null);
    vote_average: (number | null);
    overview: (string | null);
}
interface IMediaCardProps {
    MovieInfo: IMovieState;
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function MediaCard(props: IMediaCardProps) {
    const classes = useStyles();
    return (
        <div>
            <Card className="MediaCardContainer">
                <CardActionArea>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.MovieInfo.vote_average}
                    </Typography>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {props.MovieInfo.title}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {props.MovieInfo.release_date}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className="MediaCardDescription">
                            {props.MovieInfo.overview}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}

export default MediaCard