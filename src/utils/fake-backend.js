import uuid from "uuid/v4";

const localUsers = JSON.parse(localStorage.getItem("users")) || [
  {
    username: "pepito",
    password: "1234",
    name: "Pepito Perez"
  }
];

export function doLogin(email, password) {
  return new Promise((resolve, reject) => {
    // Simulate the server API call
    setTimeout(() => {
      // Authenticate
      let users = localUsers.filter(user => {
        return user.email === email && user.password === password;
      });

      if (users.length) {
        let user = { ...users[0], token: "fake-token" };
        resolve({ ok: true, json: user });
      } else {
        reject("Wrong username or password");
      }
      return;
    }, 500);
  });
}

export function doRegister(userInfo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = [...users, { ...userInfo, id: uuid() }];
        localStorage.setItem("users", JSON.stringify(users));
        resolve({ ok: true, json: { message: "Succesfully added" } });
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
}
