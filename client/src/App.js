import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBase from "./components/App/AppComponents";
import LoginPage from "./components/Landing/LoginPage";
import { Toaster } from "react-hot-toast";
import UserSignUpPage from "./components/Landing/usersignup";
import ArtistSignupPage from "./components/Landing/artistsignup";
import SearchPage from "./components/search/SearchPage";
import PlyalistPage from "./components/playlist-individual/playlistpage";
import LikedSongPage from "./components/likedsong-individual/likedsongpage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppBase />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/usersignup" element={<UserSignUpPage/>}/>
          <Route path="/artistsignup" element={<ArtistSignupPage/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/:playlistId" element={<PlyalistPage/>}/>
          <Route path="/likedsongs" element={<LikedSongPage/>} />
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
