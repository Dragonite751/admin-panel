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
import MDBadge from "components/MDBadge";
import tripdetails from "api/clonedetails";
import { useEffect, useState } from "react";

export default function Data() {
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result =tripdetails();
        console.log(result);
        setTripData(result);
        alert("hello")
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };
    fetchData();
  }, []);

  if (!tripData) {
    return null;
  }

  const Author = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  const rows = tripData
    ? [
        {
          author: <Author name={tripData.user.name} email={tripData.user.email} />,
          function: <Job title={tripData.originalTripID} />,
          status: (
            <MDBox ml={-1}>
              <MDBadge badgeContent={tripData.user.phoneNumber} color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          action: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Edit
            </MDTypography>
          ),
        },
      ]
    : [];

  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "Trip name", accessor: "function", align: "left" },
      { Header: "Phone number", accessor: "status", align: "center" },
      { Header: "Trip detail", accessor: "action", align: "center" },
    ],
    rows,
  };
}
