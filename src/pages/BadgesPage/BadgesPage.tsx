import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { Page } from '../../components/page/Page';
import { BadgeModel } from '../../models/badges.model';
import { badgesService } from '../../services/badges.service';

import classes from './Badges.module.scss';

const BadgesPage = () => {
    const [badges, setBadges] = useState<BadgeModel[]>([]);

    useEffect(() => {
        const fetchBadges = async () => {
            setBadges(await badgesService.getBadges());
        }
        fetchBadges();
    }, [])

    return (
        <Page title="Badges">
            <div className='row'>
                {badges.map(({ id, image, name, description }) => (
                    <div key={id} className="col-lg-4 col-md-6 col-sm-12">
                        <div
                            className={classNames("d-flex box-shadow align-items-center", classes.Badge)}
                        >
                            <div className={classes.BadgeImage}
                                style={{ backgroundImage: `url(${image})` }}
                            />
                            <div className='d-flex flex-column'>
                                <h5 className='ms-3'>{name}</h5>
                                <p className='ms-3 text-black-50'>{description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Page>
    )
}

export default BadgesPage;