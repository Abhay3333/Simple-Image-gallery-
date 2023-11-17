import React, { useEffect, useState } from "react";
import Imagecard from "./Components/Imagecard";
import Imagesearch from "./Components/Imagesearch";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=40727011-693bf05673f1e90aab94413f1&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <Imagesearch searchText={(text) => setTerm(text)} />
      {!isLoading && images.length === 0 && (
        <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>
      )}

      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading....</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <Imagecard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
