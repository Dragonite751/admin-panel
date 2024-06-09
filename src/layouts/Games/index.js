import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Card, Switch, FormControlLabel } from '@mui/material';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
const { authToken, setAuthToken, isLoggedIn, setIsLoggedIn } = useAuth();
const GameForm = () => {
  const { control, handleSubmit, formState: { errors } ,reset} = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'admin/addGame', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'authorization': authToken
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert("game posted")
      reset();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Create Game
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title ? 'Title is required' : ''}
                      />
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    name="url"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="URL"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.url}
                        helperText={errors.url ? 'URL is required' : ''}
                      />
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    name="engineUrl"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Engine URL"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.engineUrl}
                        helperText={errors.engineUrl ? 'Engine URL is required' : ''}
                      />
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    name="iconUrl"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Icon URL"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.iconUrl}
                        helperText={errors.iconUrl ? 'Icon URL is required' : ''}
                      />
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    name="plays"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Plays"
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.plays}
                        helperText={errors.plays ? 'Plays is required' : ''}
                      />
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    name="pvpEnabled"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch {...field} checked={field.value} />}
                        label="PvP Enabled"
                      />
                    )}
                  />
                  <MDBox mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </MDBox>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default GameForm;
