import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";

function admin() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  function checkLogin() {
    Axios.get("/api/islogin").then((res) => {
      console.log(res);
      if (res.status === 200 && res.data.name) {
        setIsLogin(true);
      } else {
        router.push("/login");
      }
    });
  }
  function logout() {
    console.log("logout");
    Axios.get("/api/logout").then((res) => {
      if (res.status === 200) {
        router.push("/");
      }
    });
  }
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      admin
      {isLogin && <Button onClick={logout}>LogOut</Button>}
    </>
  );
}

export default admin;
