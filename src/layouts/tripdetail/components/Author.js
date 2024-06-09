import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

const Author = ({ name, email, phoneNumber }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography display="block" variant="caption">email:  {email}</MDTypography>
  
        <MDTypography display="block" variant="caption">phno:  {phoneNumber}</MDTypography>
      </MDBox>
    </MDBox>
  );

export default Author;  