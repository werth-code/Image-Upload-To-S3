import {React, useState} from 'react'
import UploadComponent from './UploadComponent'
//import S3FileUpload from 'react-s3/lib/ReactS3';
//const { AWSAccessKeyId, AWSSecretKey, photobucket } = process.env;

function PhotoUpload(props) {

    const [progress, setProgress] = useState('getUpload')
    const [url, setImageUrl] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState("")

    const onUrlChange = e => setImageUrl(e.target.value)
    const onImage = async(failed, success) => { 
        if(!url) {
            setErrorMessage("Missing An Upload URL")
            console.log(errorMessage)
            setProgress('uploadError')
            return
        }
        setProgress('uploading')

        try {
            console.log('successImages')
        }
        catch(error) {
            console.log(error)
            setErrorMessage(error.message)
            setProgress('uploadError')
        }
    }
    
    // const config = {
    //   bucketName: photobucket,
    //   dirName: 'Enter Folder Name ', /* optional */ 
    //   region: 'US East (N. Virginia) us-east-1',
    //   accessKeyId: AWSAccessKeyId,
    //   secretAccessKey: AWSSecretKey
    // }

    // const upload = (e) => {
    //     S3FileUpload.uploadFile(e.target.files[0], config)
    //         .then( (data) => console.log(data.location))
    //         .catch( (error) => alert(error))
    // }


    const content = () => {
        switch(progress) {
            case 'getUpload': return <UploadComponent onUrlChange={onUrlChange} onImage={onImage} url={url}/>
            case 'uploading': return <h2>Uploading..</h2>
            case 'uploaded': return <img src={url} alt='uploaded'></img>
            case 'uploadError':
                return (
                        <>
                            <div>Error Message: {errorMessage}</div>
                            return <div>Upload Images</div>
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
