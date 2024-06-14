import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';

interface Post {
  title: string;
  content: string;
}

interface MainProps {
  posts: ReadonlyArray<Post>;
  title: string;
}

export default function Main(props: MainProps) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography fontFamily={'JetBrains Mono'} variant="h3" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post, index) => (
        <React.Fragment key={index}>
          <Typography fontFamily={'JetBrains Mono'} variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <Markdown className="markdown">{post.content}</Markdown>
        </React.Fragment>
      ))}
    </Grid>
  );
}