import {  Box,styled} from '@mui/material';
import colors from '../../colors/colorsTheme';


export const StyleModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    backgroundColor: colors.white,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
}));