import { useDispatch } from "react-redux";
import axios from "../axios";
import { updateAccessToken } from "../features/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials

  //this function sends the cookie to the /refresh endpoint and that sends us back
  //a new access token
  const refresh = async () => {
    const response = await axios.get("/api/refresh", {
      withCredentials: true,
    });

    dispatch(updateAccessToken({ accessToken: response.data.accessToken }));
    // setAuth(prev => {
    //     console.log(JSON.stringify(prev));
    //     console.log(response.data.accessToken);
    //     return { ...prev, accessToken: response.data.accessToken }
    // });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
