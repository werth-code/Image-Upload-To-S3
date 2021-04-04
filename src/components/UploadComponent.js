import React from 'react'
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
                        onChange={props.onChange}
                        imgExtensions={['.jpg', '.jpeg']}
                        maxFileSize={5242880}/>
            </form>
)

export default UploadComponent
