import React, { useContext, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BreedsContext, ImagesContext } from "../../utils/contexts";
import api from "../../utils/api";
import Loader from "../../components/Loader";

export default function Breed() {
  const { breed } = useParams();
  const breeds = useContext(BreedsContext);
  const { images, setImages } = useContext(ImagesContext);

  const [next, setNext] = useState(null);

  const loadImages = useCallback(
    async (breedName) => {
      const result = await api.breedImages(breedName);
      setImages(breedName, result);
    },
    [images, setImages]
  );

  useEffect(() => {
    const index = breeds.indexOf(breed);
    let nextBreed = null;
    if (index >= 0) {
      nextBreed = breeds[index + 1] || null;
    }

    if (next !== nextBreed) {
      setNext(nextBreed);
    }
  }, [breeds, breed]);

  useEffect(() => {
    if (!images[breed]) {
      loadImages(breed);
    }
  }, [images, breed]);

  useEffect(() => {
    if (next && !images[next]) {
      loadImages(next);
    }
  }, [next]);

  return (
    <div>
      <Link to="/">Home</Link>
      <h3 className="text-center">{breed}</h3>
      <div className="flex">
        {!images[breed] ? (
          <Loader />
        ) : (
          images[breed].map((img) => (
            <img key={img} className="thumbnail" src={img} alt={breed} />
          ))
        )}
      </div>
      {next && (
        <footer className="flex justify-end">
          <Link className="flex items-center" to={`/${next}`}>
            <span>{next}</span>
            {images[next] && images[next][0] && (
              <img
                className="small-thumbnail"
                src={images[next][0]}
                alt={next}
              />
            )}
          </Link>
        </footer>
      )}
    </div>
  );
}
