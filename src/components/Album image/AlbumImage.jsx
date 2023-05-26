import "./AlbumImage.css"
const AlbumImage = (url) => {

  if(!url)
  {
    return <div>sadd</div>;
  }

  return (
    <div className="album-image-container">
      <img src={url.url} alt="album" className="album-image"/>
      <div className="image-shadow">
        <img src={url.url} className="image-shadow"/>
      </div>
      
    </div>
  )
}

export default AlbumImage
