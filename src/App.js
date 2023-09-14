import React from 'react'
import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import RenderCounters from "./Components/RenderCounters"

const navItems = ['Counter', 'About'];

function App() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const drawerWidth = 240;
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                P-Nut Counter
            </Typography>
            <Divider/>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{textAlign: 'center'}}>
                            <ListItemText primary={item}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window.document.body : undefined;
    return (
        <Box>
            <Box>
                <AppBar component="nav">
                    <Toolbar sx={{bgcolor:"#435334"}}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 2, display: {sm: 'none'}}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                        >
                            P-Nut Counter
                        </Typography>
                        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                            {navItems.map((item) => (
                                <Button key={item} sx={{color: '#fff'}}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: {xs: 'block', sm: 'none'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                            opacity: "0.88",
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
            <Box sx={{bgcolor: '#CEDEBD', width: "100%", display: 'flex', justifyContent:'center'}}>
                <RenderCounters/>
            </Box>
        </Box>
    );
}

export default App;
