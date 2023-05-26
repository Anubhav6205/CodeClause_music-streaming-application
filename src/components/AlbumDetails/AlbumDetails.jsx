import "./AlbumDetails.css";

const AlbumDetails = (data) => {
  console.log(data)

  return (
    <div className="album-details-container">
      <div className="album-name marquee">
        <p>{data.data.album.name }</p>
      </div>
      <div className="album-info">
        <p>
          {data.data.album.album_type.charAt(0).toUpperCase() +
            data.data.album.album_type.slice(1)}{" "}
          . {data.data.album.total_tracks>1+" songs in list"? data.data.album.total_tracks:data.data.album.total_tracks +" song in list."}
        </p>
      </div>
      <div className="album-release-date">
        <p>Released on {data.data.album.release_date}</p>
      </div>
    </div>
  );
};

export default AlbumDetails;
