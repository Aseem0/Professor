import axios from "axios";
import React, { useEffect, useState } from "react";
import MyInformation from "../../MyInformation";

export interface IAuthUserList {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  _v: number;
}

const AuthHomePage = () => {
  const [users, setUsers] = useState<IAuthUserList[]>([]);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    async function fetchData() {
      axios
        .get("http://localhost:3000/userRoutes/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          const userList: IAuthUserList[] = res.data.users;
          setUsers(userList);
        })
        .catch((error) => {
          //   const errors = error?.response?.data?.message || "No access Token";
          //   alert(errors);
        });
    }
    fetchData();
  }, []);
  return (
    <div>
      {users?.map((user, index) => {
        return (
          <MyInformation
            key={index}
            id={user?._id}
            name={user?.name}
            email={user?.email}
          />
        );
      })}
    </div>
  );
};

export default AuthHomePage;
