import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BreedsContext } from "../../utils/contexts";

export default function Home() {
  const breeds = useContext(BreedsContext);

  return (
    <div>
      <Link to="/">Home</Link>
      <h3 className="text-center">Breeds</h3>
      <ul>
        {breeds.map((item) => (
          <li key={item}>
            <Link to={`/${item}`} data-testid="item-breed">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
