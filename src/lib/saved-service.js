import axios from 'axios';

class SavedApi {
  constructor() {
    this.apiInstance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  saveForLater(id) {
    return this.apiInstance.post(`saved/add-delete/${id}`)
      .then(({ data }) => {
        return data
      })
  }

}
const SavedService = new SavedApi();

export default SavedService