import React, { FC, useState, useEffect } from "react"
import { Button, SelectChangeEvent } from "@mui/material"
import "./Home.css"
import SelectBlock from "../components/SelectBlock"
import DogApi from "../services/DogApi"

const Home: FC = (): JSX.Element => {
  const [breed, setBreed] = useState<string>("")
  const [subBreed, setSubBreed] = useState<string>("")
  const [numberOfImages, setNumberOfImages] = useState<string>("3")
  const [listAllBreeds, setListAllBreeds] = useState<Array<any>>([])
  const [listSubBreeds, setListSubBreeds] = useState([])
  const [images, setImages] = useState([])
  const [errorBreed, setErrorBreed] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const result = await DogApi.getListAllBreeds()
      setListAllBreeds(result)
    })()
  }, [])

  useEffect(() => {
    if (breed !== "" && errorBreed === true) {
      setErrorBreed(false)
    }
  }, [breed, errorBreed])

  const changeBreed = (event: SelectChangeEvent) => {
    const value = event.target.value as any
    setBreed(value)
    setSubBreed("")
    const subBreeds = listAllBreeds[value]
    setListSubBreeds(subBreeds)
  }

  const changeSubBreed = (event: SelectChangeEvent) => {
    setSubBreed(event.target.value)
  }

  const changeNumberOfImages = (event: SelectChangeEvent) => {
    setNumberOfImages(event.target.value)
  }

  const loadImages = async () => {
    if (breed === "") {
      setErrorBreed(true)
      return
    }
    if (subBreed === "") {
      const result = await DogApi.getListAllBreedImages(breed, numberOfImages)
      setImages(result)
    } else {
      const result = await DogApi.getListAllSubBreedImages(
        breed,
        subBreed,
        numberOfImages,
      )
      setImages(result)
    }
  }

  return (
    <div className="home">
      <div className="actions">
        <SelectBlock
          error={errorBreed}
          label="Breed"
          value={breed}
          items={Object.getOwnPropertyNames(listAllBreeds)}
          handleChange={(event: any) => {
            changeBreed(event)
          }}
        />

        <SelectBlock
          disabled={listSubBreeds.length === 0}
          label="Sub breed"
          value={subBreed}
          items={listSubBreeds}
          handleChange={(event: any) => {
            changeSubBreed(event)
          }}
        />

        <SelectBlock
          label="Number of images"
          value={numberOfImages}
          items={[3, 6, 9, 12]}
          handleChange={(event: any) => {
            changeNumberOfImages(event)
          }}
        />

        <Button onClick={loadImages}>View images</Button>
      </div>
      <div className="images">
        {images.slice(0, Number(numberOfImages)).map((image) => {
          return (
            <div className="image-box" key={image}>
              <img src={image} alt={image} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
