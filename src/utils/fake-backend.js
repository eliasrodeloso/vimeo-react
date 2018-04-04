let users = JSON.parse(localStorage.getItem("user")) || [];

export function configureBackend() {
  let realFetch = window.fetch;
  window.fetch = (url, opts) => {
    return new Promise((resolve, reject) => {
      // Simulate the server API call
      setTimeout(() => {
        let params = opts.body;

        // Authenticate
        if (url.endsWith("/users/login") && opts.method === "POST") {
          let user = users.filter(user => {
            return (
              user.username === params.username &&
              user.password === params.password
            );
          });

          if (user.length) {
            user = { ...user[0], token: "fake-token" };
            resolve({ ok: true, json: () => user });
          } else {
            reject("Wrong username or password");
          }
          return;
        }

        // Register
        if (url.endsWith("/users/register") && opts.method === "POST") {
          return;
        }

        realFetch(url, opts).then(response => resolve(response));
      }, 500);
    });
  };
}
