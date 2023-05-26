import AlbumImage from "../Album image/AlbumImage.jsx";
import AlbumDetails from "../AlbumDetails/AlbumDetails.jsx";
import "./Card.css";

const Card = (album) => {
    if(!album  && !album.album &&!album.album.images && !album.album.images.length > 0)
    {
        return <div>sadd</div>;
    }

  if (album &&album.album && album.album.images && album.album.images.length > 0) {
    return (
      <div className="album-details">
        <AlbumImage url={album.album.images[0].url} />
        <AlbumDetails data={album}/>
      </div>
    );
  }
};

export default Card;
