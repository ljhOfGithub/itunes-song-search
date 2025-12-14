import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import InfoIcon from '@mui/icons-material/Info';

import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import EmptyState from './components/EmptyState';

import { fetchSongs, paginateData } from './utils/api';

const ITEMS_PER_PAGE = 24;

const App = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trackName');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const data = await fetchSongs('Talyor+Swift', 200, 'music');
        setSongs(data);
        setFilteredSongs(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch songs from iTunes API. Please try again later.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    let result = [...songs];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(song => {
        const songName = song.trackName?.toLowerCase() || '';
        const albumName = song.collectionName?.toLowerCase() || '';
        return songName.includes(term) || albumName.includes(term);
      });
    }

    result.sort((a, b) => {
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';
      return aValue.localeCompare(bValue, 'en', { sensitivity: 'base' });
    });

    setFilteredSongs(result);
    setCurrentPage(1);
  }, [searchTerm, sortBy, songs]);

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginatedData = paginateData(filteredSongs, currentPage, ITEMS_PER_PAGE);
  const currentSongs = paginatedData.data;

  const handleSongClick = (trackViewUrl) => {
    if (trackViewUrl) {
      window.open(trackViewUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" className="app-container">
        <Box className="loading-container">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="app-container">
      <Stack spacing={3} className="app-content">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" className="app-title" gutterBottom>
            iTunes Music Search
          </Typography>
          <Tooltip title="Search, sort and click on songs to view details on iTunes">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box className="stats-box">
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1" fontWeight="medium">
              Total Songs: {songs.length}
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              Filtered: {filteredSongs.length}
            </Typography>
            <Tooltip title="API limit is 200 but may return up to 210 songs">
              <InfoIcon fontSize="small" color="action" />
            </Tooltip>
          </Stack>
        </Box>

        <Stack spacing={2} className="search-section">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            placeholder="Search by song name or album name..."
          />

          <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
            <Stack direction="row" spacing={1} alignItems="center" className="sort-controls">
              <Typography variant="body1" className="sort-label">Sort by:</Typography>
              <RadioGroup
                row
                value={sortBy}
                onChange={handleSortChange}
              >
                <FormControlLabel
                  value="trackName"
                  control={<Radio />}
                  label="Song Name"
                />
                <FormControlLabel
                  value="collectionName"
                  control={<Radio />}
                  label="Album Name"
                />
              </RadioGroup>
            </Stack>

            {searchTerm && (
              <Button
                variant="outlined"
                onClick={handleClearSearch}
                size="small"
              >
                Clear Search
              </Button>
            )}
          </Stack>
        </Stack>

        {filteredSongs.length === 0 ? (
          <EmptyState
            message={searchTerm
              ? `No songs found for "${searchTerm}". Try a different search term.`
              : "No songs available from iTunes API."
            }
          />
        ) : (
          <>
            <Box sx={{ minHeight: '625px' }}>
              <SongList
                songs={currentSongs}
                onSongClick={handleSongClick}
              />
            </Box>

            <Box className="pagination-info">
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredSongs.length)} of {filteredSongs.length} songs
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Page {currentPage} of {paginatedData.totalPages}
                  </Typography>
                  <Tooltip title="24 songs per page">
                    <InfoIcon fontSize="small" color="action" />
                  </Tooltip>
                </Stack>
              </Stack>
            </Box>

            {paginatedData.totalPages > 1 && (
              <Box className="pagination-container">
                <Pagination
                  count={paginatedData.totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontSize: '1rem',
                      margin: '0 4px',
                    }
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default App;