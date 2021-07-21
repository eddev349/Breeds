import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BreedsContext, ImagesContext } from "./utils/contexts";
import api from "./utils/api";
import Home from "./pages/Home";
import Breed from "./pages/Breed";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const loadBreeds = async () => {
      const result = await api.breeds();
      setBreeds(result);
    };
    loadBreeds();
  }, []);

  const setBreedImages = useCallback(
    (breed, breedImages) => {
      setImages({ ...images, [breed]: breedImages });
    },
    [images]
  );

  return (
    <BreedsContext.Provider value={breeds}>
      <ImagesContext.Provider value={{ images, setImages: setBreedImages }}>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/:breed">
                <Breed />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </ImagesContext.Provider>
    </BreedsContext.Provider>
  );
}

export default App;
