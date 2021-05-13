const authReducer = (state, { type, payload }) => {
  switch (type) {
  case "LOGIN": {
    localStorage.setItem("authEmail", JSON.stringify(payload.email));
    localStorage.setItem("role", JSON.stringify(payload.role));
    return {
      isLoggedIn: true,
      authEmail: payload.email,
      role: payload.role,
    };
  }
  case "LOGOUT": {
    localStorage.setItem("authEmail", JSON.stringify(null));
    return { isLoggedIn: false, authEmail: null, role: null };
  }
  default: {
    throw new Error(`Unhandled action type: ${type}`);
  }
  }
};

export default authReducer;
