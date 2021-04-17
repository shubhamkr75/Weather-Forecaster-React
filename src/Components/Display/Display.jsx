import React, { useState } from "react";

import "./Display.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import img from "../../Images/Weather.png"

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    flexGrow: 1,
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

const Display = ({ input }) => {
  const classes = useStyles();
  const [userdata, setUserdata] = useState({});
  const [checkdata, setCheckdata] = useState(false);

  const handleClick = (input) => {
    const city = input.input;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=4aa335152a2dbc39594f80bd55ffcd4c`)
      .then((res) => res.json())
      .then((data) => {
        setUserdata(data);
        setCheckdata(true);
        if(data.message){
          setCheckdata(false);
        }
      });
  };

  return (
    <div className="display-container">
      <div className="searchbtn">
        <Button
          size="large"
          className="btn-search"
          variant="outlined"
          color="primary"
          onClick={() => handleClick({ input })}
        >
          Search
        </Button>
      </div>

      <div>

        {(() => {
          if (checkdata) {
            return (
              <Card className={classes.root} variant="outlined">
                <CardContent className="userdata">
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Typography variant="h6" className={classes.title}>
                      {userdata.name} Weather
                    </Typography>
                    <img src={img} width='250px' height='200px'/>
                                           
                    <u>
                      <p className="username">{userdata.main.temp}°C </p>
                    </u>
                    <u>
                      <p className="username">Max: {userdata.main.temp_max}°C </p>
                    </u>
                    <u>
                      <p className="username">Min: {userdata.main.temp_min}°C </p>
                    </u>
                    <p>{userdata.bio}</p>
                  </Grid>

                  
                </CardContent>
              </Card>
            );
          }else if(!checkdata && userdata.message){
            return (
              
              <p className="username">Error Message: {userdata.message}</p>
            )
            
          } 
        })()}
      </div>
    </div>
  );
};

export default Display;
