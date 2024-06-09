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
import { useParams } from 'react-router-dom';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import tripdetails from "api/clonedetails";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";
import Author from "./components/Author";

const Basetrip = ({ trip }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        TripName: {trip.originalTripID.name}
      </MDTypography>
      <MDTypography display="block" variant="button" fontWeight="medium">
      
        <p>Members: {trip.user.name}</p>
        <p>Members: {trip.user.email}</p>
        <p>Members: {trip.user.phoneNumber}</p>
        <p>Members: {trip.members.min}</p>
        <p>start date: {new Date(trip.dates.start).toLocaleDateString()}</p>
      </MDTypography>
    </MDBox>
  </MDBox>
);

const Detail = ({ trip }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        Location: {trip.itineraryID.locationID.name}
      </MDTypography>
      <MDTypography display="block" variant="button" fontWeight="medium">
        Type: {trip.itineraryID.locationID.typeLocation}
      </MDTypography>
      <MDTypography display="block" variant="button" fontWeight="medium">
      Type: {trip.itineraryID.locationID.address}
    </MDTypography>
 
    </MDBox>
  </MDBox>
);

const Price = ({ trip }) => {
  const [minCost, setMinCost] = useState(trip.itineraryID.locationID.cost.min);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      //check this code this is buggy
      // const response1 = await fetch('http://localhost:3001/trip/updateCost', {
      //   method: 'POST',
      //   mode: 'cors',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTVlNGEyZDE3MDJjNWFiOGViMTNiMiIsIm5hbWUiOiJHdWluZWFQaWciLCJlbWFpbCI6ImthaXZ1MDkxMkBnbWFpbC5jb20iLCJ2ZXJpZmljYXRpb25TdGF0dXMiOnsiZW1haWwiOmZhbHNlLCJwaG9uZSI6ZmFsc2UsImluc3RhZ3JhbSI6ZmFsc2V9LCJpYXQiOjE3MTczNTIwNjEsImV4cCI6MTcxOTk0NDA2MX0.Qnn873N28a4HAsKmNkzzuMf7XpfXKclIdp9LMhX4wFw'
      //   },
      //   body: JSON.stringify({
      //     itineraryId: trip._id,
      //     cost: {
      //       min: minCost,
      //       max: 0,
      //     },
      //   }),
      // });

      // if (!response1.ok) {
      //   throw new Error('Failed to update costs');
      // }
      // alert('Costs updated successfully');
    } catch (error) {
      console.error('Error updating costs:', error);
      alert("Error updating costs");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <MDBox lineHeight={1} textAlign="left" style={{  }}>
      <TextField
        label="Price"
        value={minCost}
        onChange={(e) => setMinCost(e.target.value)}
        variant="outlined"
        size="small"
        disabled={isUpdating}
        style={{padding:'2px'}}
      />
      <IconButton onClick={handleSave} disabled={isUpdating} style={{  color:'white' }}>
        {isUpdating ? <CircularProgress size={24} /> : <SaveIcon />}
      </IconButton>
    </MDBox>
  );
};
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const Time = ({ trip, startdate }) => {
  const numberOfDays = trip.itineraryID.dayNumber; 
  const newDate = addDays(startdate, numberOfDays);
  const formattedNewDate = newDate.toLocaleDateString();
  return (
    <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
      <p>Date: {formattedNewDate}</p>
      <p>Time: {new Date(trip.itineraryID.time.start).toLocaleTimeString()} - {new Date(trip.itineraryID.time.end).toLocaleTimeString()}</p>
    </MDTypography>
  );
};

const TripStatusSelect = ({ trip, handleStatusChange }) => {
  const [status, setStatus] = useState(trip.status || "todo");
  const [isUpdating, setIsUpdating] = useState(false);
  const handleChange = async (event) => {
    const newStatus = event.target.value;
    setIsUpdating(true);
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:3001/myTrip/update/itinerary', {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
          authorization: authToken,
        },
        body: JSON.stringify({
          clonedItineraryId: trip._id,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setStatus(newStatus);
      alert("Status updated");
      handleStatusChange(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
      alert("Error updating status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Select value={status} onChange={handleChange} disabled={isUpdating}>
      <MenuItem value="todo">todo</MenuItem>
      <MenuItem value="done">done</MenuItem>
    </Select>
  );
};

function Itinerary() {
  const { id } = useParams();
  const [tripData, setTripData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await tripdetails();
        setTripData(result.trips[id]);
        if (result.trips[id]) {
          setStartDate(result.trips[id].dates.start);
          setLoading(false); 
        } else {
          setError(true); 
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
        setError(true); 
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div style={{ position: 'absolute', left: '35em',color:'white' }}>Loading...</div>; 
  }
  if (error || !tripData) {
    return <div style={{ position: 'absolute', left: '35em',color:'white'}}>404 - Itinerary not found</div>; 
  }

  const filterByType = (itinerary, type) => {
    if (type === 'all') return itinerary;
    return itinerary.filter(trip => trip.itineraryID.locationID.typeLocation === type);
  };

  const columns = [
    { Header: "Itinerary Location", accessor: "Itinerarylocation", width: "15%", align: "left" },
    { Header: "Price", accessor: "price", align: "left" },
    { Header: "Timeline", accessor: "timeline", align: "left" },
    { Header: "Status", accessor: "status", align: "left" },
  ];

  const rows = filterByType(tripData.clonedItinerary, selectedType).map((trip) => ({
    Itinerarylocation: <Detail trip={trip} />,
    price: <Price trip={trip} />,
    timeline: <Time trip={trip} startdate={startDate} />,
    status: (
      <TripStatusSelect
        trip={trip}
        handleStatusChange={(newStatus) => {
          console.log(`Status changed to: ${newStatus}`);
        }}
      />
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              {tripData && <Basetrip trip={tripData} />}
              <MDBox  alignItems="center" p={3}>
                <MDTypography variant="button" fontWeight="medium">Filter by Type: </MDTypography>
                <Select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="hotel">Hotel</MenuItem>
                  <MenuItem value="visit">Visit</MenuItem>
                  <MenuItem value="food">Food</MenuItem>
                </Select>
              </MDBox>
              <MDBox pt={0}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Itinerary;
