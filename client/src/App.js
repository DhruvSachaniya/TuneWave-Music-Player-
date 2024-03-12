import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBase from "./components/App/AppComponents";
import LoginPage from "./components/Landing/LoginPage";
import { Toaster } from "react-hot-toast";
import UserSignUpPage from "./components/Landing/usersignup";
import ArtistSignupPage from "./components/Landing/artistsignup";
import SearchPage from "./components/search/SearchPage";
import PlyalistPage from "./components/playlist-individual/playlistpage";
import LikedSongPage from "./components/likedsong-individual/likedsongpage";
import ArtistPage from "./components/artist-individual/ArtistPage";
import AccountPage from "./components/window-pages/accountpage";
import UploadMusicPage from "./components/window-pages/UploadMusic";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppBase />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/usersignup" element={<UserSignUpPage />} />
          <Route path="/artistsignup" element={<ArtistSignupPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route exact path="/playlist/:playlistId" element={<PlyalistPage />} />
          <Route path="/likedsongs" element={<LikedSongPage />} />
          <Route exact path="/artist/:artistId" element={<ArtistPage />} />
          <Route path="/account-overview" element={<AccountPage />} />
          <Route path="/uploadmusic" element={<UploadMusicPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}

export default App;
