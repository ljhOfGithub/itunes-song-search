import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const EmptyState = ({ message = "No songs found. Try a different search term." }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        color: 'text.secondary',
        textAlign: 'center',
        padding: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '16px',
        border: '2px dashed rgba(25, 118, 210, 0.3)'
      }}
    >
      {message.includes('No songs found') ? (
        <SentimentDissatisfiedIcon sx={{ fontSize: 80, mb: 3, color: 'text.disabled' }} />
      ) : (
        <MusicNoteIcon sx={{ fontSize: 80, mb: 3, color: 'text.disabled' }} />
      )}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
        {message.includes('No songs found') ? 'No Results Found' : 'No Songs Available'}
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: '500px' }}>
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;