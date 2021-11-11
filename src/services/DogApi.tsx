class DogApi {
  location = process.env.REACT_APP_URL_API
  async getListAllBreeds(): Promise<[]> {
    let list = []
    try {
      const response = await fetch(`${this.location}/breeds/list/all`)
      const data = await response.json()

      if (data.status === "success") {
        list = data.message
      }
    } catch (err) {}

    return list
  }

  async getListAllBreedImages(
    breed: string,
    numberOfImages: string,
  ): Promise<[]> {
    let images = []
    try {
      const response = await fetch(
        `${this.location}/breed/${breed}/images/random/${numberOfImages}`,
      )
      const data = await response.json()

      if (data.status === "success") {
        images = data.message
      }
    } catch (err) {}

    return images
  }

  async getListAllSubBreedImages(
    breed: string,
    subBreed: string,
    numberOfImages: string,
  ): Promise<[]> {
    let images = []
    try {
      const response = await fetch(
        `${this.location}/breed/${breed}/${subBreed}/images/random/${numberOfImages}`,
      )
      const data = await response.json()

      if (data.status === "success") {
        images = data.message
      }
    } catch (err) {}

    return images
  }
}

export default new DogApi()
