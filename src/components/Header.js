import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid, Tab, Tabs } from "@mui/material";
import { SmartToy } from "@mui/icons-material";
import { useState } from "react";

const Header = () => {
  const [value, setValue] = useState();
  return (
    <AppBar>
      <Toolbar>
        <Grid container>
          <Grid item xs={2}></Grid>

          <Grid item xs={5}>
            <Tabs
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab label="FAQ" />
              <Tab label="Messages" />
            </Tabs>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
