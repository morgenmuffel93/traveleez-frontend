import axios from 'axios';

class ProfileApi {
  constructor() {
    this.apiInstance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  getUserInfo() {
    return this.apiInstance.get('/profile')
      .then(({ data }) => {
        return data
      })
  }

  getOtherUserInfo(id) {
    return this.apiInstance.get(`/profile/${id}`)
      .then(({ data }) => {
        return data.user
      })
  }

  updateProfile(info) {
    return this.apiInstance.put('/profile', info)
      .then(({ data }) => {
        return data
      })
  }

}
const ProfileService = new ProfileApi();

export default ProfileService