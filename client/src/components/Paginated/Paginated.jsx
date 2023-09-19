import { useEffect } from 'react';
import styles from './paginated.module.css'
import { useSelector } from 'react-redux';

const Paginated = ({ currentPage, totalPages, onPageChange }) => {
const videogames = useSelector(state => state.videogames);

    const handlePrevPage = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    }
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    }

    const arrayTotalPage = [];
    for (let i = 1; i < totalPages+1; i++) {
        arrayTotalPage.push(i);
    }

    const handleClick = (event) => {
        onPageChange(Number(event.target.value)-1)
    }

    useEffect(() => {
        onPageChange(0)
    },[videogames])

    const pageNumbers = Number(currentPage) + 1;

    return(
        <div className={styles.divPaginated}>
            <div>
                <h3>Page {pageNumbers}</h3>
            </div>
            <div className={styles.divButtons}>
                {currentPage > 0 ? <button onClick={handlePrevPage}>Prev</button> : null}
                {arrayTotalPage ? arrayTotalPage.map((num, index) => {
                    return <button 
                                key={index}
                                onClick={handleClick}
                                value={num}
                                >{num}</button>
                }) : null}     
                {currentPage !== totalPages - 1 ? <button onClick={handleNextPage}>Next</button> : null}
            </div>
        </div>
    )
}

export default Paginated;