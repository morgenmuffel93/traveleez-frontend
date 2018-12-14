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
      .then(({ data }) => {
        return data
      })
  }

  createGuide(data) {
      console.log("this is data", data)
    return this.apiInstance.post('/guides-list', data)
      .then((response) => {
        console.log(response.data.response)
      })
  }
  guideDetails(id) {
    return this.apiInstance.get(`/guides-list/edit/${id}`)
    .then((response) => {
      return response.data
    })
  }

  updateGuide(id, data) {
        console.log(data)
    return this.apiInstance.put(`/guides-list/edit/${id}`, data)
      .then((response) => {
          console.log(response)
        return response.data
      })
  }

  deleteGuide(id) {
    return this.apiInstance.delete(`/guides-list/delete/${id}`)
      .then((response) => {
        return response.data
      })
  }

}
const GuideService = new GuideApi();

export default GuideService