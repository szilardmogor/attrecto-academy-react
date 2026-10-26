import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames";

import { Page } from "../../components/page/Page";
import { BadgeModel } from "../../models/badges.model";
import { badgesService } from "../../services/badges.service";

import classes from "./Badges.module.scss";
import { useNavigate } from "react-router";
import AccessController from "../../components/access-controller/AccessController";
import { Button } from "../../components/button/Button";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { hasPermission } from "../../util/hasPermission";

const BadgesPage = () => {
  const [badges, setBadges] = useState<BadgeModel[]>([]);

  const navigate = useNavigate();

  const fetchBadges = useCallback(async () => {
    setBadges(await badgesService.getBadges());
  }, []);

  useEffect(() => {
    const fetchBadges = async () => {
      setBadges(await badgesService.getBadges());
    };
    fetchBadges();
  }, []);

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  useEffect(() => {
    const fetchBadges = async () => {
      setBadges(await badgesService.getBadges());
    };
    fetchBadges();
  }, []);

  const goToBadgePage = () => {
    navigate("/badge");
  };

  const handleDeleteBadge = async (id: string | number) => {
    await badgesService.deleteBadge(id);
    await fetchBadges();
  };

  const allowedUserChangeFor: Role[] = ["ADMIN"];

  const showLink = hasPermission(allowedUserChangeFor);

  return (
    <Page title="Badges">
      <AccessController allowedFor={allowedUserChangeFor}>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Button
              color="primary"
              className="w-100 mb-3"
              onClick={goToBadgePage}
            >
              Create Badge
            </Button>
          </div>
        </div>
      </AccessController>
      <div className="row">
        {badges.map(({ id, image, name, description }) => {
          const badgeCard = (
            <>
              <div
                className={classes.BadgeImage}
                style={{ backgroundImage: `url(${image})` }}
              />
              <div className="d-flex flex-column">
                <h5 className="ms-3">{name}</h5>
                <p className="ms-3 text-black-50">{description}</p>
              </div>
            </>
          );
          return (
            <div
              key={id}
              className={classNames(
                "col-lg-4 col-md-6 col-sm-12",
                classes.BadgeWrapper,
              )}
            >{showLink ? (
              <Link
                to={`/badge/${id}`}
                className={classNames(
                  "d-flex box-shadow align-items-center text-decoration-none text-reset",
                  classes.Badge,
                )}
              >
                {badgeCard}
              </Link>
              ) : (
              <div
                className={classNames(
                  "d-flex box-shadow align-items-center",
                  classes.Badge,
                )}
              >
                {badgeCard}
              </div>
              )}
              <AccessController allowedFor={allowedUserChangeFor}>
                <Button
                  className={classes.DeleteIcon}
                  onClick={() => handleDeleteBadge(id)}
                  aria-label={`Delete ${name}`}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </AccessController>
            </div>
          );
        })}
      </div>
    </Page>
  );
};

export default BadgesPage;
