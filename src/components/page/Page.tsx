import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface PageProps {
    title?: string;
    noCard?: boolean;
    children: ReactNode;
}

export const Page = ({title, noCard, children}: PageProps) => {
    return (
        <div className='container pt-3'>
            {title && <h5>{title}</h5>}
            <div className={classNames({"card bg-white shadow p-3": !noCard})}>
                {children}
            </div>
        </div>
    )
};