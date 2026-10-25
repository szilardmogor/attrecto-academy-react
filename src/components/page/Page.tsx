import React, { ReactNode, useSyncExternalStore } from 'react';
import classNames from 'classnames';
import { getApiLoadingSnapshot, subscribeToApiLoading } from '../../util/requestLoader';
import { Loader } from '../loader/Loader';

interface PageProps {
    title?: string;
    noCard?: boolean;
    children: ReactNode;
}

export const Page = ({title, noCard, children}: PageProps) => {
  const isLoading = useSyncExternalStore(
    subscribeToApiLoading,
    getApiLoadingSnapshot
  );

  return (
    <div className='container pt-3'>
      {title && <h5>{title}</h5>}
      <div className={classNames({"card bg-white shadow p-3": !noCard})}>
        {isLoading ? <Loader /> : children}
      </div>
    </div>
  );
};