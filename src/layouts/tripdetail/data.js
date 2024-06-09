/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
 * =========================================================
 * Material Dashboard 2 React - v2.2.0
 * =========================================================
 *
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)
 *
 * Coded by www.creative-tim.com
 * =========================================================
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Material Dashboard 2 React components

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import tripdetails from "api/clonedetails";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ProgressBar from 'react-bootstrap/ProgressBar';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Author from "./components/Author";
import Tripname from "./components/Tripname";




const Trippercentage = ({ tripData }) => {
  if (!tripData || !Array.isArray(tripData.clonedItinerary)) {
    return <p>0%</p>;
  }

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  const total = tripData.clonedItinerary.length;
  if (total === 0) {
    return <p>0%</p>;
  }

  const count = tripData.clonedItinerary.reduce((acc, trip) => {
    return trip.status === 'todo' ? acc + 1 : acc;
  }, 0);

  const percentage = 100-(count / total) * 100;

  return (
    
    <div>
    <BorderLinearProgress variant="determinate" value={percentage} />
    <p>{percentage.toFixed(2)}%</p> 
    </div>
    
  );
};


const TripDetail = ({ tripData, onStatusChange, index }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate=useNavigate();

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const handleNavigation = (index) => {
    navigate(`/itinerary/${index}`);
  };

  return (
    <div>
      <button onClick={()=>{ handleNavigation(index)}} style={{borderRadius: '5px',padding:'7px'}}>TripDetail</button>
      <MDBox lineHeight={1} textAlign="left" onClick={toggleExpanded} style={{ cursor: 'pointer' }}>
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        </MDTypography>
      </MDBox>
      
    </div>
  );
};


export default function Data() {
  const [tripData, setTripData] = useState(null);
  const [statusChangeTrigger, setStatusChangeTrigger] = useState(0); 
  const handleStatusChange = () => {
    setStatusChangeTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await tripdetails();
        console.log("Fetched trip details:", result);
        setTripData(result);
      } catch (error) {
        console.error("Error fetching trip details:", error);
        setError(true); 
        setLoading(false);
      }
    };
    fetchData();
  }, [statusChangeTrigger]);


  const rows = tripData
    ? tripData.trips.map((trip,index) => ({
      author: <Author name={trip.user.name} email={trip.user.email} phoneNumber={trip.user.phoneNumber} />,
      tripname: <Tripname title={trip.originalTripID.name} />,
      members:<p>{trip.members.min}</p>,
      date: <p>{new Date(trip.dates.start).toLocaleDateString()}</p>,
      tripstatus: <Trippercentage tripData={trip} />,
      tripdetail: <TripDetail tripData={trip} index={index} onStatusChange={handleStatusChange} />,
    }))
    : [];

  return {
    columns: [
      { Header: "Author", accessor: "author", width: "25%", align: "left" },
      { Header: "Trip Name", accessor: "tripname", align: "left" },
      { Header: "members", accessor: "members", align: "left" },
      { Header: "start date", accessor: "date", align: "left" },
      { Header: "Trip status", accessor: "tripstatus", align: "left" },
      { Header: "List of itineraries", accessor: "tripdetail", align: "left" },
    ],
    rows,
  };
}
