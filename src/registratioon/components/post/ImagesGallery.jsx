import React from 'react'
function ImagesGallery({ images }) {
    return (
        <div className="column" style={{ display: "flex"}}>
            {
                images.map((url) => {
                    return (
                        // <li key={url}>
                        // <div className="col-sm-1">
                        <div className="card">
                            <img style={{width: "60%" }} src={url} />
                        </div>
                        // {/* </div> */ }
                        // </li>
                    )
                })
            }

        </div>
    )
}
export default ImagesGallery;