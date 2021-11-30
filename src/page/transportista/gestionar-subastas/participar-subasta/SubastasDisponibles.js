import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../../component/SignOutComponent';
import { Link } from 'react-router-dom';
import { getAuctionsByStatus } from '../../../../service/Transportista/auctions-service';
import { useState, useEffect } from 'react';
import BackToComponent from '../../../../component/backToComponent';

function SubastasDisponibles() {
    const [auctions, setAuctions] = useState([]);

    const fetchData = async () => {
        const response = await getAuctionsByStatus(1);
        console.log(response);
        setAuctions(response);
    };

    const displayAuctions = auctions.map((auction) => {
        return (
            <div class='col-sm-4'>
                <div class='card'>
                    <div class='card-body'>
                        <h5 class='card-title'>ID: {auction.idSubasta}</h5>
                        <p class='card-text'>
                            With supporting text below as a natural lead-in to
                            additional content.
                        </p>
                        <a
                            href={`/transportista/gestionar-subastas/participar-subastas/detalle-subasta/${auction.idSubasta}`}
                            class='btn btn-primary'
                        >
                            Participar
                        </a>
                    </div>
                </div>
            </div>
        );
    });

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container'>
            <div
                className=' jumbotron mt-5'
                style={{
                    backgroundColor: '#324c3f',
                    height: '200px',
                    paddingTop: '80px',
                }}
            >
                <h1
                    style={{
                        color: 'white',
                    }}
                >
                    Subastas Disponibles
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <div class='row'>{displayAuctions}</div>
                    <BackToComponent />
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default SubastasDisponibles;
