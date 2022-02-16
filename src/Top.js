import React from 'react';
import { 
    Grid,
    Typography,
  } from '@mui/material'

export default function Top({itemData}){

    return(
        <Grid container>
      
            <Grid xs={8}>
                <Typography variant="h6" component="div">
                    {itemData.name}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {itemData.slogan}
                </Typography>
                <Typography variant="body1" component="div">
                    {itemData.description}
                </Typography>
            </Grid>
            <Grid xs={4}>
                <img width="100" src={itemData.imgUrl} alt={itemData.name} />
                <Typography variant="subtitle1" component="div">
                    Ƀ{itemData.default_price}
                </Typography>
            </Grid>
        </Grid>
    )
}


