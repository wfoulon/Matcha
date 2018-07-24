import React, { Component} from 'react'
// import ImageUploader from 'react-images-upload'
import Dropzone from 'react-dropzone'
import request from 'superagent'
 
// class Test extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       file: '',
//       imagePreviewUrl: ''
//     }
//     this.handleImageChange = this.handleImageChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleSubmit (e) {
//     e.preventDefault()
//     // TODO: do something with -> this.state.file
//   }

//   handleImageChange (e) {
//     e.preventDefault()
//     let reader = new FileReader()
//     let file = e.target.files[0]
//     reader.onloadend = () => {
//       this.setState({
//         file: file,
//         imagePreviewUrl: reader.result
//       })
//     }
//     reader.readAsDataURL(file)
//   }
//   render () {
//     let {imagePreviewUrl} = this.state
//     let $imagePreview = null
//     if (imagePreviewUrl) {
//       $imagePreview = (<img src={imagePreviewUrl} />)
//     }
//       return (
//         <div>
//             <input type="file" onChange={this.handleImageChange} />
//             <button type="submit" onClick={this.handleSubmit}>Upload Image</button>
//             <div>
//           {$imagePreview}
//           </div>
//         </div>
//       )
//     }
  
//   }

export default class Test extends React.Component {
  // constructor (pros) {
  //   super(props)
  // onImageDrop = () => {
  //   console.log('ok')
  // }
  render () {
    return (
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={this.onImageDrop.bind(this)}>
        <p>Drop an image or click to select a file to upload.</p>
      </Dropzone>
    )}
      // export default Test
  }
// }
