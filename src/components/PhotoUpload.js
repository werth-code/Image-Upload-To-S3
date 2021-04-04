import {React} from 'react'
import S3FileUpload from 'react-s3/lib/ReactS3';
const { AWSAccessKeyId, AWSSecretKey, photobucket } = process.env;

function PhotoUpload() {
    
    const config = {
      bucketName: photobucket,
      dirName: 'Enter Folder Name ', /* optional */ // need to get this from form name....
      region: 'US East (N. Virginia) us-east-1',
      accessKeyId: AWSAccessKeyId,
      secretAccessKey: AWSSecretKey
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    } 

    const upload = (e) => {
        S3FileUpload.uploadFile(e.target.files[0], config)
            .then( (data) => console.log(data.location))
            .catch( (error) => alert(error))
    }

    return (
        <div>
            <h2>Upload Photos</h2>
            <h5>Choose A Folder</h5>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Name'></input>
                <input type='file' name='file'></input>
                <button type="submit">Upload</button>
            </form>
            
        </div>
    )
}

export default PhotoUpload
