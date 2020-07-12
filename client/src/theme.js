import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
        light: '#c3e3db',
        main: '#92b1a9',
        dark: '#64817a',
        contrastText: '#000',
      },
      secondary: {
        light: '#ff8850',
        main: '#e75723',
        dark: '#ad2300',
        contrastText: '#000',
      },
  },
});

export default theme