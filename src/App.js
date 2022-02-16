import React from 'react';
import './App.css';
import { 
  Grid,
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  CardActions

} from '@mui/material'


const urlList = `http://52.26.193.201:3000/products/list`;



function App() {
  const [productData, setProductData] = React.useState([]);
  const [viewingState, setViewingState] = React.useState({});
  const [itemData, setItemData] = React.useState('');

// get image url
  React.useEffect (()=>{
    let urlItem = `http://52.26.193.201:3000/products/${viewingState.id}/styles`
    async function fetchItem() {
      let itemObj = {};
      const response = await fetch(urlItem);
      const result = await response.json();
      // console.log(result.results[0].photos[0].url);
      let currentIndex = viewingState.index;

      itemObj.imgUrl = result.results[0].photos[0].url;
      itemObj.name = productData[currentIndex].name;
      itemObj.slogan = productData[currentIndex].slogan;
      itemObj.description = productData[currentIndex].description;
      itemObj.category = productData[currentIndex].category;
      itemObj.default_price = productData[currentIndex].default_price;
      
      setItemData(itemObj)
    }
    if(viewingState.userEvaluating){
      fetchItem()
    }
    
  });

 console.log(itemData);

  React.useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(urlList);
      const result = await response.json();
      setProductData(result);
    }
    fetchProducts();
  }, []);


  function handleLearnMore(key){
    let viewObject = {
      id: null,
      index: null,
      userEvaluating: false
    }
    viewObject.userEvaluating = (viewingState.userEvaluating && key === viewingState.id) ? false : true;
    viewObject.id = key;
    viewObject.index = key - 1;
    setViewingState(viewObject);
  }



  return (
    <div className="App">
      <header className="App-header">
        {/* Browser Window */}
        <Grid container>
          {/* Top Bar */}
          <Grid xs={8}>
            <Card>

              <CardContent>
               
              <Typography variant="h6" component="div">
                      {itemData.name}
              </Typography>
              <Typography variant="subtitle1" component="div">
                      {itemData.slogan}
              </Typography>
              <Typography variant="body1" component="div">
                      {itemData.description}
              </Typography>
              </CardContent>
      
            </Card>
          </Grid>
          <Grid xs={4}>
            <Card>

              <CardContent>
               
                <img width='100' src={itemData.imgUrl} alt={itemData.name} />
              <Typography variant="subtitle1" component="div">
              Ƀ{itemData.default_price}
              </Typography>

              </CardContent>
      
            </Card>
          </Grid>


          {/* Body */}
          <Grid container xs={12}>
            {productData.map((item, index) => (
              <Grid key={index} item xs={6}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardContent>
                    👨‍🚀
                    <Typography variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5 }}
                      variant="subtitle1"
                      color="text.secondary"
                    >
                      {item.slogan}
                    </Typography>
                    <Typography variant="body2">{item.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={ () => handleLearnMore(index+1)} size="small" variant="contained">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
