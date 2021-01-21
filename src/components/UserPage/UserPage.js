import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { HashRouter as Route, Link } from 'react-router-dom';

//styling
import {AppBar, Toolbar, Grid, Badge, IconButton, makeStyles, InputBase, TextField, Card, CardMedia, centerText, withStyles} from '@material-ui/core'



const styles = {
  inputs: {
      width: '50%',
      paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'


  }, cardMedia : {
    margin: 'auto',
    marginTop: '10px'
},
centerText : {
  textAlign : 'center'
}
}
// const artToEdit= this.state.art
class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ART' });
  }

//   state = {
//     artToEdit: {
//       id: '',
//       user_id: '',
//       title: '',
//       medium: '',
//       dimension: '',
//       url: '',
//       statement: ''
//     },
// }

handleInputChange = (event, inputProperty) => {
  console.log('Handling input-change...');
  console.log('Setting state...');
  
  //console.log('Handling input change. this.state.newArt.user_id', this.state.newArt.user_id);
              this.setState({
                artToEdit : {
                  ...this.state.artToEdit,
                  [inputProperty]: event.target.value,
                  // id : this.props,
                  //user_id : this.props.store.user.id
                }
              }, function () {
                  console.log('State has been set:', this.state);
              })
            }
  // const shelfData = useSelector((state) => state.shelf);

  // openEdit = (event, art) => {
  //   console.log(`In openEdit function...`);
  //   console.log('art:', art);
  //   console.log('Setting state...')
  //   this.setState({
  //     artToEdit : {
  //       ...this.state.artToEdit,
  //       id : art.id,
  //       user_id : this.props.store.user.id,
  //       title : art.title,
  //       medium : art.medium,
  //       dimension : art.dimension,
  //       url : art.url,
  //       statement : art.statement
  //     }
  //   }, function () {
  //       console.log('State has been set:', this.state);
  //   })
  // }

  

  
    
    //Clear message... should say Hello!
    //console.log(`Sending ${this.state.newArt} to DB.`);

    
 getDetails = (event, { art }) => {
  console.log('Gettin Details for :', art.title)
  console.log(art.id)
  this.props.dispatch({ type: 'FETCH_DETAILS', payload: art.id });
  this.props.history.push('/Detail')
  this.props.history.push( {pathname: `/Detail`, state: art})
  



}


  render() {
    // const art = useSelector((state) => state.store.art);
    const { classes } = this.props;
    // console.log(this.props)
    const art = this.props.store.art;



    return (
      <div>
        RS: {JSON.stringify(this.props.store)}
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>


   <h3>Here is your art: {JSON.stringify(art)}</h3> 
   <Grid container
            spacing={2}
            className={classes.inputs}>
   {art.map((art) => (
            <Grid item xs={12} sm={4}
            key={art.id}>


<Card onClick={(event)=> this.getDetails(event, {art})}>
{/*className={classes.centerText} */}
{/* <Card> */}
{/* <img onClick={(event) => this.getDetails(event, { movie })} src={movie.poster} alt="" /> */}
<CardMedia image={art.url} style={{width: '130px', height: '130px'}}/>
  {/* <centerText className={classes.centerText} artProp={art}> */}
          {/* <li key={art.id} className={'shelf'} > */}
            {/* <h2>User ID: {info.user_id}</h2> */}
            {/* <p>Description: {info.description}</p> */}
            {/* <img src={info.image_url} alt={info.description}></img> */}
            {/* <button onClick={() => dispatch({type : "DELETE_ITEM", payload : info})}>DELETE</button>  */}
<h1>{art.title}</h1>

{/* <button onClick={(event)=>this.deleteArt(event, art)}>DELETE</button> */}
{/* <button onClick={(event)=>this.deleteConfirmation(event, art)}>delconf</button> */}
{/* </centerText> */}
</Card>
 {/* </Link>  */}
{/* <button onClick={(event)=>this.openEdit(event, art)}>EDIT</button> */}
{/* <h1>{art.title}</h1> */}

          </Grid>



        ))}

{/*  */}





{art.map((art) => (
            <Grid item xs={12} sm={4}
            key={art.id}>


{/* <Card onClick={(event)=> this.getDetails(event, {art})}> */}
{/* <CardMedia image={art.url} style={{width: '130px', height: '130px'}}/> */}
  
<h1 className={classes.centerText}>{art.title}</h1>


{/* </Card> */}

          </Grid>



        ))}







{/*  */}


        </Grid>
        
  <LogOutButton className="log-in" />
      </div>
    );//END return
  }//END render
}//END UserPage

// this allows us to use <App /> in index.js
//export default connect(mapStoreToProps)(UserPage);
export default connect(mapStoreToProps)(withStyles(styles)(UserPage));
