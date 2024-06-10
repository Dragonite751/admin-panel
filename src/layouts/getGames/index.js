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
import SaveIcon from "@mui/icons-material/Save";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useAuth } from "context/authContext";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";

// Component to display game URLs
const UrlDetail = ({ game }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        url: {game.url}
      </MDTypography>
      <MDTypography display="block" variant="button" fontWeight="medium">
        engineUrl: {game.engineUrl}
      </MDTypography>
      <MDTypography display="block" variant="button" fontWeight="medium">
        iconUrl: {game.iconUrl}
      </MDTypography>
    </MDBox>
  </MDBox>
);

function Gameform() {
  const { authToken } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}admin/getGames`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'authorization': authToken
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.games) {
          setGames(data.games);
        } else {
          console.error('Failed to fetch game titles');
        }
      } catch (error) {
        console.error('Error fetching game titles:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  if (loading) {
    return <div style={{ position: 'absolute', left: '35em', color: 'white' }}>Loading...</div>;
  }

  if (error || !games.length) {
    return <div style={{ position: 'absolute', left: '35em', color: 'white' }}>404 - Itinerary not found</div>;
  }

  const columns = [
    { Header: "Game Title", accessor: "GameTitle", width: "35%", align: "left" },
    { Header: "Url", accessor: "Url", align: "left" },
    { Header: "PVP Enabled", accessor: "pvp", align: "left" },
    { Header: "Plays", accessor: "Plays", align: "left" },
  ];

  const rows = games.map((game) => ({
    GameTitle: <h4>{game.title}</h4>,
    Url: <UrlDetail game={game} />,
    pvp: <p>{game.pvpEnabled ? 'Yes' : 'No'}</p>, // Assuming pvpEnabled is a boolean
    Plays: <p>{game.plays}</p>
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
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

export default Gameform;
