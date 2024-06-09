import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Card, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
const { authToken, setAuthToken, isLoggedIn, setIsLoggedIn } = useAuth();
const QuestForm = () => {
  const { control, handleSubmit, formState: { errors },reset } = useForm();
  const [gameTitles, setGameTitles] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const toggleTrigger = () => {
    setTrigger(prevState => !prevState);
  };


  useEffect(() => {
    const fetchGameTitles = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL+'admin/getGames', {
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
        console.log(data.games);
        if (data.success) {
          setGameTitles(data.games);
        } else {
          console.error('Failed to fetch game titles');
        }
      } catch (error) {
        console.error('Error fetching game titles:', error);
      }
    };

    fetchGameTitles();
  }, [trigger]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL+'admin/addQuest', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjMzMDRlMjM1ZmVjZDMwMTMxMGNjMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNzg3NzQ2OCwiZXhwIjoxNzE3OTYzODY4fQ.by3TmT0fexbVmHPtGQLtL3s83-VF_pZLkBk_WhS_PcI"
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert("quest posted")
      toggleTrigger();
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
                  Create Quest
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="gameId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl fullWidth margin="normal" variant="outlined" sx={{ mb: 1 }}>
                        <InputLabel id="gameId-label">Game Title</InputLabel>
                        <Select
                          {...field}
                          labelId="gameId-label"
                          variant="outlined"
                          label="Game Title"
                          multiline
                          rows={2}
                          error={!!errors.gameId}
                          sx={{ paddingY: 2 }}
                        >
                          {gameTitles.map((game, index) => (
                            <MenuItem key={index} value={game._id}>
                              {game.title}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.gameId && <Box sx={{ color: 'red', mt: 1 }}>Game Title is required</Box>}
                      </FormControl>
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description ? 'Description is required' : ''}
                        sx={{ mb: 2 }}
                      />
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    name="requiredScore"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Required Score"
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.requiredScore}
                        helperText={errors.requiredScore ? 'Required Score is required' : ''}
                        sx={{ mb: 2 }}
                      />
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    name="reward"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Reward"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.reward}
                        helperText={errors.reward ? 'Reward is required' : ''}
                        sx={{ mb: 2 }}
                      />
                    )}
                    rules={{ required: true }}
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

export default QuestForm;
