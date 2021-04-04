import { AlexaForBusiness } from 'aws-sdk'
import Axios from 'axios'
import {React, useState} from 'react'
import ImageUploader from 'react-images-upload'

const UploadComponent = props => (
            <form>
                <label>Client S3 URL:
                    <input id='urlInput' type='text' onChange={props.onUrlChange} value={props.url}></input>
                </label>
                    <ImageUploader
                        key='image-uploader'
                        withIcon={true}
                        singleImage={false}
                        withPreview={true}
                        label="Max Size 5mb"
                        buttonText='Choose An Image'
                        onChange={props.onImage}
                        imgExtensions={['.jpg', '.jpeg']}
                        maxFileSize={5242880}/>
            </form>
)

function PhotoUpload(props) {

    const [progress, setProgress] = useState('getUpload')
    const [url, setImageUrl] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState("")

    const onUrlChange = e => setImageUrl(e.target.value)
    
    const onImage = async(failedImages, successImages) => { 
        if(!url) {
            setErrorMessage("Missing An Upload URL")
            console.log("Missing Url")
            setProgress('uploadError')
            return
        }

        setProgress('uploading')

        try {
            console.log('successImages', successImages)
            const parts = successImages[0].split(';')
            const mime = parts[0].split(':')[1]
            const name = parts[1].split('=')[1]
            const data = parts[2]
            const res = await Axios.post(url, {mime, name, image: data})

            setImageUrl(res.data.setImageUrl)
            setProgress('uploaded')
        }
        catch(error) {
            console.log("Error in upload", error)
            setErrorMessage(error.message)
            setProgress('uploadError')
        }
    }
    

    const content = () => {
        switch(progress) {
            case 'getUpload': return <UploadComponent onUrlChange={onUrlChange} onImage={onImage} url={url}/>
            case 'uploading': return <h2>Uploading..</h2>
            case 'uploaded' : return <img src={url} alt='uploaded'/>
            case 'uploadError':
                return (
                        <>
                            <div>Error Message: {errorMessage}</div>
                            <div>Upload Images</div>
                        </>
                )
            default: return <div>Upload Images</div>
        }
    }

    return (
        <div>
            <h1>Upload An Image</h1>
            {content()}
        </div>
    )
}

export default PhotoUpload
