import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      float: "left",
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }),
);

interface IResultChipProps{
    TotalResult:number;
}
export default function ResultChip(props:IResultChipProps) {
  const classes = useStyles();


  return (
    <div className={classes.root}>
         
      <Chip
        label= {"Total Results: "+props.TotalResult}
        color="primary"
        variant="outlined"
      />
    
    </div>
  );
}
