import { Link } from 'react-router-dom';
import delorean from '../../media/pictures/marioo.gif'

const Delorean = () => {
    return(
        <Link to='/home'>
            <img style={{height: '100px'}} src={delorean} alt='Delorean'/>
        </Link>
    )
}

export default Delorean;