import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
 
      },
    },
  }),
);
interface IMoviePaginationProps{
  SetCurrentPage: (curPage:number) => void;
  CurrentPage: number;

  MaxPage: number;
}

const backToTop = ()=>{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
export default function MoviePagination(props: IMoviePaginationProps) {
  const classes = useStyles();

  const[MaxPage,setMaxPage] = useState<number>(1);

  useEffect(() => {
    setMaxPage(props.MaxPage);
  }, [props.MaxPage])

  return (
    <div className={classes.root} >
      <Pagination count={MaxPage} page={props.CurrentPage} variant="outlined" shape="rounded" onClick={ (e)=>{backToTop()}} onChange = {(e:object,page:number)=>{ props.SetCurrentPage(page) }} />
    </div>
  );
}
