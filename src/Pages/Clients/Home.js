import React from "react";
import UserHome from "../../Components/clients/Home/UserHome.jsx";
import Header from "../../Components/clients/Header/Header.jsx";
import Navbar from "../../Components/clients/Home/NavBar.jsx";
import SearchBar from "../../Components/clients/Home/SearchBar.jsx";

function Home() {
    return (
        <div className="" >
          <Navbar/>
          <SearchBar/>     
        {/* <UserHome/> */}
      </div>
    );
}

export default Home;
