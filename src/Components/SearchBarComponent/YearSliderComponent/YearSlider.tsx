import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    margin: {
      height: theme.spacing(12),
    },
  }),
);

const marks = [
  {
    value: 1900,
    label: 'Year 1900'
  },
  {
    value: 1925,
    label: 'Year 1925',
  },
  {
    value: 1950,
    label: 'Year 1950',
  },
  {
    value: 1975,
    label: 'Year 1975',
  },
  {
    value: 2000,
    label: 'Year 2000',
  }
];

function valuetext(value: number) {
  return `Year ${value}`;
}

interface IYearSliderProps {
  SetYearRelease: (year: number) => void;
}
export default function YearSlider(props: IYearSliderProps) {
  const classes = useStyles();

  const DefaultYear:number = 2020;

  const [YearRelease, setYearRelease] = React.useState(DefaultYear);
  const handlerYearReleaseChange = (year: number | number[])=> {
    if (typeof year === "number") {
      setYearRelease(year);
      props.SetYearRelease(year);
    }
  }


  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-always" gutterBottom>
        Which Year
      </Typography>
      <Slider
        defaultValue={DefaultYear}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        min={1878}
        max={2020}
        valueLabelDisplay="on"
        onChangeCommitted={(event: object, value: number | number[]) => { handlerYearReleaseChange(value) }}
      />
    </div>
  );
}
