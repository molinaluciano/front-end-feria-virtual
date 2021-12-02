import 'bootstrap/dist/css/bootstrap.min.css';

import ListMisSubastas from './ListMisSubasta';

function MisSubastas() {
    return (
        <div className='container'>
            <div className='content-header'>
                <div className='container-fluid'>
                    <div className='row mb-2'>
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
                                Panel Transportista
                            </h1>
                        </div>
                        <div>
                            <ListMisSubastas />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MisSubastas;
