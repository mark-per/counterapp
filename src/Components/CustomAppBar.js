import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
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
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'


const navItems = [
    {navLink: 'Counter', url: '/'},
    {navLink: 'About', url: '/about'},
];

export default function CustomAppBar() {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const drawerWidth = 240;
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{py: 2, bgcolor:"#435334"}}>
                P-Nut Counter
            </Typography>
            <Divider/>
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton sx={{textAlign: 'center'}} onClick={() => navigate(item.url)}>
                            <ListItemText primary={item.navLink}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window.document.body : undefined;
    return (
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
                        {navItems.map(item => (
                            <Button
                                sx={{color: '#fff'}}
                                onClick={() => navigate(item.url)}
                            >
                                {item.navLink}
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
    );
}