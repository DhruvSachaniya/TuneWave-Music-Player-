import FirstCompo from "../first-compo/fiirstcompo";
import Footer from "../Footer/Footer";
import FirstSection from "../second-compo/firstsection";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MusicPlayer from "../Music-player/MusicPlayer";
import { useDispatch } from "react-redux";
import {
  PlayCurrentSong,
  addSongsforMusicPlayer,
} from "../../redux/redux-files/counterlist";
import EllipsisWindow from "../buttons/EllipsisWindow";

export default function ArtistPage() {
  const { artistId } = useParams();
  const [artistdata, setartistData] = useState(null);
  const [countartistsongs, setcountartistsongs] = useState(0);
  const [artistimage, setartistimage] = useState("");
  const [isAccountWindowVisible, setIsAccountWindowVisible] = useState(false);
  const [SongId, setSongId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchartistdata() {
      try {
        const res = await axios({
          url: `/artist/${artistId}`,
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt_token"),
          },
        });
        setartistData(res.data);
        setartistimage(
          `http://localhost:3333/uploads/artist_photos/${res.data.album_photo}`
        );
        setcountartistsongs(res.data.Music.length);
      } catch (error) {
        console.error("Error fetching artist data:", error.message);
      }
    }
    fetchartistdata();
  }, [artistId]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleUserEllipsisClick = (id) => {
    setSongId(id);
    setIsAccountWindowVisible(!isAccountWindowVisible);
  };

  return (
    <div className="container">
      <FirstCompo />
      {artistdata && artistimage ? (
        <div className="secondcompo">
          <div
            style={{
              backgroundImage: `url(${artistimage})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              position: "relative",
              zIndex: "1",
              minHeight: "20rem",
              borderImage: "fill 0 linear-gradient(#0003, #000)",
            }}
          >
            <FirstSection />
            {artistdata && (
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                }}
              >
                <h1
                  style={{
                    fontSize: "5rem",
                    position: "relative",
                    zIndex: "2",
                  }}
                >
                  {artistdata.name}
                </h1>
                <p style={{ position: "relative", zIndex: "2" }}>
                  {countartistsongs} songs
                </p>
              </div>
            )}
          </div>
          <div className="playlist-container">
            {/* <h1>{artistdata.name}</h1>
                    <p>{ } . { } songs</p> */}
            <div className="playlist-container-2">
              <h3>hellow there</h3>
              <div className="playlist-song-area">
                <div className="playlist-song-area">
                  {/* one for first row */}
                  <div className="playlist-song-area-1">
                    <div>#</div>
                    <div style={{ marginLeft: "10px" }}>title</div>
                    <div>album</div>
                    <div>date</div>
                    <div>
                      <span class="material-symbols-outlined">timelapse</span>
                    </div>
                  </div>
                  <div className="playlist-line" />
                  {artistdata && artistdata.Music.length > 0 ? (
                    artistdata.Music.map((playlist, index) => (
                      <div
                        className="playlist-song-area-2"
                        key={playlist.id}
                        onClick={() => {
                          dispatch(addSongsforMusicPlayer(artistdata.Music));
                          dispatch(PlayCurrentSong(index));
                        }}
                      >
                        <div>{index + 1}</div>
                        <div className="library-likedsongs playlist-song-list">
                          <div>
                            <img
                              style={{ width: "40px" }}
                              src={`http://localhost:3333/uploads/music_photos/${encodeURIComponent(
                                playlist.music_photo
                              )}`}
                              alt="liked_song"
                            />
                          </div>
                          <div>
                            <h3>{playlist.name}</h3>
                            <div className="library-likedsongs-2">
                              <p>{playlist.description}</p>
                            </div>
                          </div>
                        </div>
                        <div>{playlist.ArtistId}</div>
                        <div>{formatDate(playlist.createdAt)}</div>
                        <div className="playlist-song-area-2-timer">
                          <div>time</div>
                          <div
                            onClick={() => handleUserEllipsisClick(playlist.id)}
                          >
                            <i class="fa-solid fa-ellipsis"></i>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No songs found by artist.</p>
                  )}
                  {isAccountWindowVisible && (
                    <EllipsisWindow songId={SongId} page={"artistpage"} />
                  )}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      ) : null}
      <MusicPlayer />
    </div>
  );
}
