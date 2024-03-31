import React from "react";

const fakeAuthenticationService = {
  users: [],
  login: async (usernameOrEmail, password) => {
    // Simulate an asynchronous API call for authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        // Add your actual authentication logic here
        const user = fakeAuthenticationService.users.find(
          (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
        );

        if (user && user.password === password) {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: 'Invalid username/email or password' });
        }
      }, 1000); // Simulating a delay for the API call
    });
  },
  signup: async (userData) => {
    // Simulate an asynchronous API call for signup
    return new Promise((resolve) => {
      setTimeout(() => {
        // Add your actual signup logic here
        fakeAuthenticationService.users.push(userData);
        resolve({ success: true });
      }, 1000); // Simulating a delay for the API call
    });
  },
};

export default fakeAuthenticationService;



  