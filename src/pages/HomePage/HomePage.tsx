import React, { useState } from 'react';

import { Page } from '../../components/page/Page';
import { Button } from '../../components/button/Button';

const HomePage = () => {
    const [count, setCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const increaseCount = () => {
        setCount((currentValue) => currentValue + 1);
        setErrorMessage('');
    };

    const decreaseCount = () => {
        if (count === 0) {
            setErrorMessage('A számláló nem lehet kisebb mint 0!');
            return;
        }

        setCount((currentValue) => currentValue - 1);
    };

    const resetCount = () => {
        setCount(0);
        setErrorMessage('');
    };

    return (
        <Page title="Home" noCard>
            <div className="container d-flex justify-content-center">
                <div className="card bg-white shadow text-center p-4 m-4">
                    <h1>Counter: {count}</h1>

                    <div className="d-flex justify-content-center flex-wrap gap-2">
                        <Button color="primary" onClick={increaseCount}>
                            Increase +
                        </Button>
                        <Button color="secondary" onClick={decreaseCount}>
                            Decrease -
                        </Button>
                        <Button color="danger" onClick={resetCount}>
                            Reset
                        </Button>
                    </div>
                    {errorMessage && (
                        <p className="text-danger mt-3">
                            {errorMessage}
                        </p>
                    )}
                </div>
            </div>
        </Page>
    );
};

export default HomePage;