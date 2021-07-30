import React from 'react'
// import VideoPreload from '../../Assets/Videos/Login/videopreload.webm'

const Video = () => {
    return (
        <div>
            <video width="100%" height="100%" autoPlay preload loop >
                {/* <source src={VideoPreload} type="video/webm"/> */}
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default Video
