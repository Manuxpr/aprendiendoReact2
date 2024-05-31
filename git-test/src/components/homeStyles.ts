import { makeStyles } from "@mui/styles";

export const homeStyles = makeStyles({

    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fetchButton: {
      marginTop: '20px',
      marginBottom: '20px',
      padding: '10px 20px',
      borderRadius: '12px',
      borderWidth: '2px',
      '&:hover': {
        borderColor: 'darkpurple',
        color: 'darkpurple',
      },
    },
    card: {
      width: '300px',
      marginTop: '16px',
      boxShadow: '3',
      borderRadius: '12px',
      borderColor: 'darkpurple',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: '20px',
    },
    cardHeader: {
      textAlign: 'center',
    },
    cardMedia: {
      objectFit: 'contain',
      marginTop: '10px',
    },
    cardContent: {
      width: '100%',
      textAlign: 'center',
    },
    quillContainer: {
      width: '100%',
      marginTop: '16px',
      backgroundColor: 'white',
      borderRadius: '8px',
    },
  });