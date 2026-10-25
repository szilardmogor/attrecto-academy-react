import React, { useCallback, useEffect, useState } from "react";

import { Page } from "../../components/page/Page";
import { UserModel } from "../../models/user.model";
import { userService } from "../../services/user.service";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import UserCard from "../../components/user-card/UserCard";
import { BadgeModel } from "../../models/badges.model";
import { badgesService } from "../../services/badges.service";
import AccessController from "../../components/access-controller/AccessController";
import BadgeImage from "../../components/badge-image/BadgeImage";
import { hasPermission } from "../../util/hasPermission";


const UsersPage = () => {
  
  const [users, setUsers] = useState<UserModel[]>([]);
  const [badges, setBadges] = useState<BadgeModel[]>([]);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setUsers(await userService.getUsers());
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const fetchBadges = async () => {
      setBadges(await badgesService.getBadges());
    };
    fetchBadges();
  }, []);

  const goToUserPage = () => {
    navigate("/user");
  };

  const handleDeleteUser = async (id: string | number) => {
    await userService.deleteUser(id);

    fetchUsers();
  };

  const [usersView, setUsersView] = useState<"table" | "card">("card");
  const allowedUserChangeFor = hasPermission(["ADMIN"]);


  return (
    <Page title="Users">
      <AccessController allowedFor={["ADMIN"]}>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Button color="primary" className="w-100 mb-3" onClick={goToUserPage}>
              Create User
            </Button>
          </div>
        </div>
      </AccessController>
      <div className="mb-3 d-flex gap-2">
        <Button
          color={usersView === "table" ? "primary" : "secondary"}
          onClick={() => setUsersView("table")}
        >Táblázat
        </Button>
        <Button
          color={usersView === "card" ? "primary" : "secondary"}
          onClick={() => setUsersView("card")}
        >Kártya
        </Button>
      </div>
      {usersView === "card" ? (
        <div className="row">
          {users.map((user) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1">
              <UserCard
                key={user.id}
                user={user}
                handleDeleteUser={handleDeleteUser}
                badges={badges}
              />
            </div>
          ))}
        </div>
      ) : (
        <div >
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th >Név</th>
                <th >Elért badge-ek</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => {
                    if (allowedUserChangeFor) {
                      navigate(`/user/${user.id}`);
                    }
                  }}
                  style={{ cursor: allowedUserChangeFor ? "pointer" : "default" }}
                >
                  <td>{user.name}</td>
                  <td>
                    <div className="d-flex flex-wrap">
                      {user.badges?.map((userBadge) => {
                        const badge = badges.find((item) => item.id === userBadge.id);
                        return badge ? (
                          <BadgeImage
                            key={userBadge.id}
                            small
                            url={badge.image}
                          />
                        ) : null;
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Page>
  );
};

export default UsersPage;
