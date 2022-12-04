const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("user is Logged In");
    return token;
  } else {
    console.log("user is NOT logged in");
    return false;
  }
};

export default getToken;
