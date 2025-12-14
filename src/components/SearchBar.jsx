import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search songs or albums..." }) => {
  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        label="Search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.2)',
            }
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
          }
        }}
      />
    </Box>
  );
};

export default SearchBar;