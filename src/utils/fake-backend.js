const localUsers = JSON.parse(localStorage.getItem("user")) || [
  {
    username: "pepito",
    password: "1234",
    name: "Pepito Perez"
  }
];

export function doLogin(username, password) {
  return new Promise((resolve, reject) => {
    // Simulate the server API call
    setTimeout(() => {
      // Authenticate
      let users = localUsers.filter(user => {
        return user.username === username && user.password === password;
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
  setTimeout(() => {}, 500);
}
