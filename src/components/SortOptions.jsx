import React from 'react';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box
} from '@mui/material';

function SortOptions({ sortBy, onSortChange }) {
    const handleSortChange = (event) => {
        onSortChange(event.target.value);
    };

    return (
        <Box sx={{ my: 2 }}>
            <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'medium' }}>
                    排序方式
                </FormLabel>
                <RadioGroup
                    row
                    value={sortBy}
                    onChange={handleSortChange}
                >
                    <FormControlLabel
                        value="songName"
                        control={<Radio />}
                        label="歌曲名称"
                    />
                    <FormControlLabel
                        value="albumName"
                        control={<Radio />}
                        label="专辑名称"
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}

export default SortOptions;