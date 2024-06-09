import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";


const Tripname = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

export default Tripname;