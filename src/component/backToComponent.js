import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

function BackToComponent() {
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    };

    return (
        <Button
            className='mt-3'
            style={{ backgroundColor: '#33334b' }}
            onClick={goToPreviousPath}
        >
            Volver atrás
        </Button>
    );
}

export default BackToComponent;
