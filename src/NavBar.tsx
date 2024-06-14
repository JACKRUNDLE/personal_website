"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import "@fontsource/jetbrains-mono/400.css";
import { useRouter } from 'next/navigation';
import { link } from 'fs';



const drawerWidth = 240;


export default function NavBar(props: Props) {
    const router = useRouter();
    //const sections: string[] = ["Home", "Dogs", "Cats", "Favorites"];
    const links = [
        {name: "Home", url: "/"},
        {name: "Blog", url: "/blog"},
        
    ];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography fontFamily={'JetBrains Mono'} variant="h5" sx={{ my: 2 }}>
        Rundle's Site'
      </Typography>
      <Divider />
      <List>
        {links.map((link, i) => (
            <Link key={i} href={link.url} passHref>
            <ListItemButton sx={{ textAlign: 'center' , fontFamily: 'JetBrains Mono'}}>
              <ListItemText primary={link.name} />
            </ListItemButton>
            </Link>
          
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', color: '#303C6C' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#303C6C' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            fontFamily={'JetBrains Mono'}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Rundle's Site'

          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {links.map((link, i) => (
                <Link key={i} href={link.url} passHref>
                    <Button key={i} sx={{ color: '#fff' , fontFamily: 'JetBrains Mono' }}>
                        {link.name}
                    </Button>
                </Link>
                
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}