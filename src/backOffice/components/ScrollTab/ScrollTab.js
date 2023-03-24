import React ,{useState}from 'react'
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
function ScrollTab(props) {
    const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
    <AppBar position="static" color="white" >
      <Tabs
        value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          style={{textColor:"#20384D"}}
      >
          <Tab label={props.label1} />
          <Tab label={props.label2} />
          <Tab label={props.label3} />
          <Tab label={props.label4} />
          <Tab label={props.label5} />
          <Tab label={props.label6} />


      </Tabs>
    </AppBar>
    
    <TabPanel value={value} index={0}>
       {props.item1}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.item2}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {props.item3}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {props.item4}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {props.item5}
      </TabPanel>
      <TabPanel value={value} index={5}>
        {props.item6}
      </TabPanel>
      </>
  )
}

export default ScrollTab