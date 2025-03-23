
import TuneIcon from '@mui/icons-material/Tune';
import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    Typography
} from '@mui/material';
import SearchBar from './SearchBar';

export default function AppTableHeader(props) {

    return (
        <div className="flex_col">
            <div className="flex_row align_center space_between">
                <div className="flex_row align_center">
                    <Typography sx={{
                        marginRight: '15px', display: 'flex', alignItems: 'center'
                    }} variant="h5">
                        {props.title}
                    </Typography>
                    <SearchBar />
                </div>
                <div className="flex_row align_center">
                    <Button className="sm_button" sx={{ marginRight: '15px' }}
                        variant="outlined" startIcon={<TuneIcon />}>Filtrar</Button>
                    <Button
                        onClick={(event) => { props.addClick && props.addClick() }}
                        className="sm_button"
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}>Adicionar</Button>
                </div>
            </div>
            <div className="flex1">
            </div>
        </div>
    );
}