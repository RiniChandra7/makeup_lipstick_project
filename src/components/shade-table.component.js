import { useState } from 'react';
import { Pagination } from 'react-bootstrap';

function ShadeTable({matchResults}) {
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 5;

    // Calculate the index range to display for the current page
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = matchResults.slice(indexOfFirstResult, indexOfLastResult);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <>
                        
                    {
                        
                        currentResults.length ?
                            (
                                currentResults.map((color, index) => (
                                    <tr key={index}>
                                        <td style={{ backgroundColor: color.shadeHexCode, width: '20%' }}></td>
                                        <td className="color-name">
                                            Brand: {color.productBrand.charAt(0).toUpperCase() + color.productBrand.substring(1).toLowerCase()}
                                            <br />
                                            Collection: {color.productName}
                                            <br />
                                            Shade name: {color.shadeName}
                                            <br />
                                        </td>
                                    </tr>
                                ))
                            )
                            : (
                                <tr>
                                    <td>
                                        No close matches found.
                                    </td>
                                </tr>
                            )
                    }
                    {
                        matchResults.length > resultsPerPage && (
                            <tr>
                                <td colSpan={2} style={{ textAlign: 'center' }}>
                                    <Pagination style={{margin: 'auto'}}>
                                        <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1}>
                                            Previous
                                        </Pagination.Prev>
                                        <Pagination.Next onClick={handleNextPage} disabled={indexOfLastResult >= matchResults.length}>
                                            Next
                                        </Pagination.Next>
                                    </Pagination>
                                </td>
                            </tr>
                        )
                    }
        </>
    );
}

export default ShadeTable;