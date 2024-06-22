import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PageTitle from "../../components/PageTitle";
import MoviesList from './MoviesList'

// import TheatresList from "./TheatresList";
// import UpcomingList from './UpcomingList'

function Admin() {
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate()

    useEffect(() => {
        // Check if the current user is an admin
        // If not, redirect them to home page
        if(!user.isAdmin) {
            navigate("/")
        }
    }, [])

  return (
    <div>
    <PageTitle title="Admin"/>
      <Tabs defaultActiveKey="1">
      
      <Tabs.TabPane tab="Movies" key="1">
            <MoviesList/>    
        </Tabs.TabPane>

        <Tabs.TabPane tab="Theatres" key="2">
            {/* <UpcomingList/> */}
            <p>Theaters</p>
        </Tabs.TabPane>
        
        <Tabs.TabPane tab="Upcoming Movies" key="3">
            {/* <UpcomingList/> */}
            <p>Upcoming Movies</p>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;
