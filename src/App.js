// import logo from './logo.svg';
// import './App.css';a
import React from "react";
import './drop.css'

// import '@tensorflow/tfjs-backend-cpu';
// import '@tensorflow/tfjs-backend-webgl';
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import PropTypes from 'prop-types';
// import axios from "axios";

class App extends React.Component{
  state = {
  file : '',
  viewURL : '',
  imageView : false,
  previews: ""
};




change = (e) => {
  // e.preventDefault();
  // e.stopPropagation();
  
  this.setState({file: null})
  const reader = new FileReader();
  const file = e.target.files[0];
  reader.onload = () => {
    this.setState({
      file : file,
      viewURL : reader.result
    })
  }
  const model = cocoSsd.load()
  const predic = model.detect(this.state.previews)
  console.log(predic)
  if (this.state.file !== null)
  {reader.readAsDataURL(file)};
  ; 
  this.setState({imageView : true})

}


model = (e) => {
  model = await cocoSsd.load();

}

componentDidMount(){
  const tf = document.createElement('script');
  const coco = document.createElement('script');
  tf.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"
  coco.src = "https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"
  document.body.appendChild(tf)
  document.body.appendChild(coco)

  // const cocoSsd = require('@tensorflow-models/coco-ssd');
}


// predic(){
//   const model = await cocoSsd.load();
//   const predictions = await model.detect({preview})
//   console.log(predictions)
// }

render(){
  let preview = null;
  if(this.state.file !== ''){
    preview = <img alt='imgs' className='preview' src= {this.state.viewURL}></img>
    // this.setState({previews:preview})
    // predic()
  } 



  let test = <input type='file' id='fileUpload' alt='image' onChange={this.change} />;
  let testText = <p className= 'drag-text'> 여기다 사진올려주세요</p>;
  let test2 = <p className='firstBanner'>안녕하세요</p>
  let bannerText = <p className='bannerText'>여기다 사진을 올려주세요</p>


  return(
  <body id= 'total'>
  {/* <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"> </script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"> </script> */}
  <div id= 'upperBanner'>
  {this.state.viewURL ? test : testText}
  {/* {this.state.viewURL ? } */}
  {this.state.viewURL ? bannerText: test2}
  </div>
  <div id = 'fileInputBox'>
  {this.state.viewURL ? preview: test}
  {/* {test} */}
  
  </div>
  <div>
    {/* {preview} */}
  </div>
  </body>

  )
}
}

export default App;
