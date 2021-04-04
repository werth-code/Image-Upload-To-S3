import React from 'react'
import ImageUploader from 'react-images-upload'

function UploadComponent(props) {
    return (
            <form>
                <label>
                    <input placeholder="Client S3 URL" id='urlInput' type='text' onChange={props.onUrlChange} value={props.url}></input>
                </label>
                    <ImageUploader
                        key='image-uploader'
                        withIcon={true}
                        singleImage={false}
                        withPreview={true}
                        label="Max Size 5mb"
                        buttonText='Choose An Image'
                        onChange={props.onChange}
                        imgExtensions={['.jpg', '.jpeg']}
                        maxFileSize={5242880}/>

                <button type="submit">Upload</button>
            </form>
    )
}

export default UploadComponent
