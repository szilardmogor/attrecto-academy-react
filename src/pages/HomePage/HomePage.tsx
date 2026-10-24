import React, { useState } from 'react';

import { Page } from '../../components/page/Page';
import { Button } from '../../components/button/Button';

const HomePage = () => {
    const [count, setCount] = useState(0);

    const updateCounter = (increase: boolean) => {
        setCount((currentValue) => {
            return increase ? currentValue + 1 : currentValue - 1;
        });
    };

    return (
        <Page title="Home" noCard>
            <div className="container d-flex justify-content-center">
                <div className="card bg-white shadow text-center p-4 m-4">
                    <h1>Counter: {count}</h1>
                    <div className="d-flex justify-content-center flex-wrap gap-2">
                        <Button color="primary" onClick={() => updateCounter(true)}>
                            Increase +
                        </Button>
                        <Button color="secondary" onClick={() => updateCounter(false)}>
                            Decrease -
                        </Button>
                        <Button color="danger" onClick={() => setCount(0)}>
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default HomePage;