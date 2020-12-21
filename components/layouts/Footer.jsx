import { Typography } from '@material-ui/core'
import React from 'react'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Footer=()=>{

    return(
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright @ '}
            <Link color='inherit' href='http://www.dotmatriks.com/'>
                Dotmatriks
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export default Footer