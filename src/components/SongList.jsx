import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const SongList = ({ songs, onSongClick }) => {
  if (!songs || songs.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {songs.map((song, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={`${song.trackId || index}-${index}`}>
          <Tooltip
            title={
              <Box>
                <Typography variant="body2" fontWeight="bold">{song.trackName}</Typography>
                <Typography variant="caption">Album: {song.collectionName}</Typography>
                <br />
                <Typography variant="caption">Artist: {song.artistName}</Typography>
                <br />
                <Typography variant="caption">Genre: {song.primaryGenreName}</Typography>
                <br />
                <Typography variant="caption">Click to view on iTunes</Typography>
              </Box>
            }
            placement="top"
            arrow
          >
            <Card
              className="song-card"
              sx={{
                height: '100%',
                minHeight: '400px',
                maxHeight: '400px',
                minWidth: '220px',
                maxWidth: '220px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '12px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                position: 'relative',
                cursor: 'pointer'
              }}
              onClick={() => onSongClick(song.trackViewUrl)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  sx={{
                    height: '200px',
                    width: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px'
                  }}
                  image={song.artworkUrl100?.replace('100x100', '300x300') || 'https://via.placeholder.com/200x200/1976d2/ffffff?text=No+Image'}
                  alt={song.collectionName || 'Album cover'}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(25, 118, 210, 0.9)',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <OpenInNewIcon fontSize="small" />
                </Box>
              </Box>

              <CardContent sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                overflow: 'hidden',
                width: '200px'
              }}>
                <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      lineHeight: 1.3,
                      minHeight: '42px',
                      maxHeight: '42px',
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
                      minHeight: '36px',
                      maxHeight: '36px',
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontSize: '0.8rem'
                      }}
                    >
                      {Math.floor((song.trackTimeMillis || 0) / 60000)}:
                      {String(Math.floor((song.trackTimeMillis || 0) % 60000 / 1000)).padStart(2, '0')}
                    </Typography>
                    {song.trackPrice > 0 && (
                      <Typography
                        variant="caption"
                        color="success.main"
                        sx={{
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}
                      >
                        ${song.trackPrice}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default SongList;