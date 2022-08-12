import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import './UserPage.css'
import {Button, Card, CardActions, CardContent, CardMedia} from '@material-ui/core'


function UserPage() {
  const dispatch = useDispatch();
 
  const user = useSelector((store) => store.user);
  const designs = useSelector((store) => store.home)


  useEffect(() => {
    dispatch({ type: "FETCH_USER_DESIGNS"});
    // dispatch({ type: "SEND_ID", payload:user.id});
  }, []);


  const addDesignToCart = () => {
    console.log('in addDesignToCart');
  }

  const downloadDesign = () => {
    console.log('in download design');
  }

  const editDesign = () => {
    console.log('in editDesign');
  }

  const deleteDesign = () => {
    console.log('in deleteDesign');
  }

  return (
    <div className='homePage'>
    
    <div className="companyTitle">
      RED WING LURE 
      <br />
      COMPANY

      <div className='imageSlider'>
        <p>{user.username}'s Designs</p>
      
       {designs.map(( design, index)=>{
         return(
           <div key={index}>
             <Card variant="outlined"
             sx={{ boxshaddow: 20 }} 
             >
             <CardMedia> <br />
             <img src={design.image} alt="" /><br/> Title: {design.title} </CardMedia>
             <CardContent>
              Description: {design.description}
             </CardContent>
             <div className='cardButtons'>
             <CardActions>
              
             <Button size="small" onClick={addDesignToCart}>Add To Cart</Button>
             
        <Button size="small" onClick={downloadDesign}>Download</Button>
        <Button size="small" onClick={editDesign}>Edit</Button>
        <Button size="small" onClick={deleteDesign}>Delete</Button>
       

             </CardActions>
             </div>
             
             </Card>
             </div>
            
         )
       })}
      </div>


      <div className='buttonPlacement'>
      <Button>FEED</Button>
      <Button>NEW</Button>
      </div>
    </div>

    </div>

    

    
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
