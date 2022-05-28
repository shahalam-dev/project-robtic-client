import axios from "axios";

const useToken = () => {
  const setToken = async (user) => {
    const data = await axios.post("https://robtic.herokuapp.com/login", user);

    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("user_role", data.role);
    localStorage.setItem("user_id", data.uid);
    localStorage.setItem("profile_id", data._id);
  };

  return setToken;
};

export default useToken;
