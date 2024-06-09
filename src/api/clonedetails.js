


export const tripdetails = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await fetch("https://api.clonemytrips.com/admin/autoclones", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization:authToken,
      },
    });
    const data= await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trip details:", error);
    return { error: "Failed to fetch trip details" };
  }
};

export default tripdetails;

