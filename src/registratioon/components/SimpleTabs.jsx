import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ListPosts from './post/listPosts';
import Shell from '../../general/shell/shell';
import ConsultantPage from '../pages/ConsultantPage';
import DocumentLibraryPage from '../pages/DocumentLibraryPage';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


export default function SimpleTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
        <Shell>
            <div style={{ flexGrow: 1, width: "100vw" }}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} style={{ backgroundColor: "white", color: "#3f51b5" }}>
                        <Tab label="Properties" />
                        <Tab label="Document Library" />
                        <Tab label="Consultant" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                    <ListPosts></ListPosts>
                </TabContainer>}
                {value === 1 && <TabContainer><DocumentLibraryPage></DocumentLibraryPage></TabContainer>}
                {value === 2 && <TabContainer><ConsultantPage></ConsultantPage></TabContainer>}
            </div>
        </Shell>
    );

}

// SimpleTabs.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleTabs);
