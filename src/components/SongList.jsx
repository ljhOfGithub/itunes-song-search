import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const SongList = ({ songs }) => {
  if (!songs || songs.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {songs.map((song, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={`${song.trackId || index}-${index}`}>
          <Card
            sx={{
              height: '100%',
              minHeight: '400px',
              maxHeight: '400px',
              minWidth: '200px',
              maxWidth: '200px',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '12px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              }
            }}
          >
            <CardMedia
              component="img"
              sx={{
                height: '180px',
                width: '100%',
                objectFit: 'cover',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px'
              }}
              image={song.artworkUrl100?.replace('100x100', '300x300') || 'https://via.placeholder.com/300x300/1976d2/ffffff?text=No+Image'}
              alt={song.collectionName || 'Album cover'}
            />
            <CardContent sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
              overflow: 'hidden'
            }}>
              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    lineHeight: 1.4,
                    minHeight: '56px',
                    maxHeight: '56px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    mb: 1
                  }}
                >
                  {song.trackName || 'Unknown Song'}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    minHeight: '40px',
                    maxHeight: '40px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    mb: 2
                  }}
                >
                  {song.collectionName || 'Unknown Album'}
                </Typography>
              </Box>

              <Box sx={{
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                paddingTop: '12px',
                marginTop: 'auto'
              }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    fontSize: '0.8rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    mb: 0.5
                  }}
                >
                  {song.artistName || 'Unknown Artist'}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    fontSize: '0.8rem'
                  }}
                >
                  {Math.floor((song.trackTimeMillis || 0) / 60000)}:
                  {String(Math.floor((song.trackTimeMillis || 0) % 60000 / 1000)).padStart(2, '0')}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SongList;