import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function SecondSearchSection() {
  const [playlistresponse, setPlaylistResponse] = useState([]);
  const [songresponse, setSongResponse] = useState([]);
  const [artistmusics, setArtistMusics] = useState();
  const [usermusics, setUserMusics] = useState();
  const input_value = useSelector((state) => state.counterSearch.input);

  // playlist data by searching
  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await axios({
          url: `/searchplaylist?query=${input_value}`,
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt_token"),
          },
        });
        if (response) {
          setPlaylistResponse(response.data);

          if (response.status === 200) {
            if ((await response.data.playlist.findartistplaylist.length) >= 1) {
              console.log(
                await response.data.playlist.findartistplaylist[0].name
              );
              const data_1 =
                await playlistresponse.playlist.findartistplaylist.map(
                  (item) => item.musics
                );

              setArtistMusics(data_1);
            }
            if ((await response.data.playlist.finduserplaylist.legnth) >= 1) {
              const data_2 =
                await playlistresponse.playlist.finduserplaylist.map(
                  (item) => item.musics
                );

              setUserMusics(data_2);
            }
          }
        }
      } catch (error) {
        if (error) {
          toast.error("Error to Fetch Music! ");
        }
      }
    }

    fetchPlaylist();
  }, [input_value]);

  useEffect(() => {
    async function fetchSong() {
      try {
        const response = await axios({
          url: `/searchsong?query=${input_value}`,
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt_token"),
          },
        });
        if (response) {
          if (response.data.length > 1) {
            setSongResponse(response.data);
          }
        }
      } catch (err) {
        if (err) {
          toast.error("Login Or Signup Fist For Search!");
        }
      }
    }

    fetchSong();
  }, [input_value]);

  return (
    <>
      <div className="search-results">
        <div className="top-result">
          <div className="top-result-1">
            <h2>Top result</h2>
          </div>
          {artistmusics &&
            artistmusics[0].map((playlist) => (
              <div className="top-result-2">
                <img
                  style={{ width: "100px" }}
                  src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
                  alt="liked_song"
                />
                <p>{playlist.name}</p>
                <p>created by:</p>
                {/* playlist image */}
                {/* playlistname */}
              </div>
            ))}
        </div>
        <div className="songs">
          <div className="songs-1">
            <h2>Songs</h2>
          </div>
          {input_value &&
            songresponse &&
            songresponse.map((playlist) => (
              <div className="librarysection-4" key={playlist.id}>
                <div className="library-likedsongs">
                  <div>
                    <img
                      src={`http://localhost:3333/uploads/music_photos/${encodeURIComponent(
                        playlist.music_photo
                      )}`}
                      alt="liked_song"
                    />
                  </div>
                  <div>
                    <h3 style={{ marginLeft: "5px" }}>{playlist.name}</h3>
                    <div className="library-likedsongs-2">
                      <span
                        style={{ color: "green" }}
                        className="material-symbols-sharp"
                      >
                        push_pin
                      </span>
                      <p>Plyalist. {0} songs</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="secondsection">
        <div className="secondsection-1">
          <h3>song Plyalist</h3>
          <h3 style={{ color: "gray" }}>show all</h3>
        </div>
        <div className="secondsection-2">
          <div className="secondsection-2-card">
            <div>
              <img
                style={{ width: "150px" }}
                src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
                alt="liked_song"
              />
            </div>
            <p>title</p>
            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
          </div>
          <div className="secondsection-2-card">
            <img
              style={{ width: "150px" }}
              src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
              alt="liked_song"
            />
            <p>title</p>
            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
          </div>
          <div className="secondsection-2-card">
            <img
              style={{ width: "150px" }}
              src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
              alt="liked_song"
            />
            <p>title</p>
            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
          </div>
          <div className="secondsection-2-card">
            <img
              style={{ width: "150px" }}
              src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
              alt="liked_song"
            />
            <p>title</p>
            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
          </div>
          <div className="secondsection-2-card">
            <img
              style={{ width: "150px" }}
              src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
              alt="liked_song"
            />
            <p>title</p>
            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
          </div>
          <div className="secondsection-2-card">
            <img
              style={{ width: "150px" }}
              src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
              alt="liked_song"
            />
            <p>title</p>
            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
          </div>
        </div>
      </div>
    </>
  );
}
