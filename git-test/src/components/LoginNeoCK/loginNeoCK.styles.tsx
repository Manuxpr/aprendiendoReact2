import { Card, Box, Button,styled} from '@mui/material';
import colors from '../../colors/colorsTheme';



export const StyledCardContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50%',
    padding: theme.spacing(2),
    marginTop: theme.spacing(10),
  }));

export const StyledLoginButton = styled(Button)(({ theme }) => ({
    width: theme.spacing(39),
    height: theme.spacing(6), 
    marginTop: theme.spacing(1),
    padding: theme.spacing(2, 12), 
    background: colors.primary.main,
    fontSize: theme.spacing(1.75), 

  }));


export const StyleLoginCard = styled(Card)(({ theme }) => ({
    width: theme.spacing(75), 
    height: theme.spacing(80), 
    padding: theme.spacing(1.25), 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1.25), 
    borderRadius: theme.spacing(0.75), 
    position: 'relative',
    opacity: 1,
    backgroundColor: theme.palette.background.default, 
    color: theme.palette.text.primary, 
    boxShadow: theme.shadows[3],
}));

export const StyleUpperLoginBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1.75),
    marginBottom: theme.spacing(4),
}));

export const StyleLogoBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1.75),
}));