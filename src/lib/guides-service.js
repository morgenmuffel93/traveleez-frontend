import axios from 'axios';

class GuideApi {
  constructor() {
    this.apiInstance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  getAllGuides() {
    return this.apiInstance.get('/guides-list')
      .then((response) => {
          console.log(response.data)
        return response.data
      })
  }

  createGuide(data) {
    this.apiInstance.post('/guides-list', data)
      .then((response) => {
        return response.data
      })
  }

}
const GuideService = new GuideApi();

export default GuideService