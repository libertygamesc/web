
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

function SearchBar() {
    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                size="small"
                sx={{ background: 'white' }}
                placeholder="Pesquisar"
                endAdornment={
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}

export default SearchBar;
