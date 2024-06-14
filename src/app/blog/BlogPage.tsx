import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Main from './Main';
import { useUserSettingsContext } from "@/context/userContext";



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function Blog() {

    const userSettings = useUserSettingsContext();
    const posts = userSettings?.blogPosts || [];
    
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Grid container spacing={10} sx={{ mt: 3 }}>
            <Main title="Johns Blog" posts={posts} />
          </Grid>
        </main>
      </Container>
      
    </ThemeProvider>
  );
}