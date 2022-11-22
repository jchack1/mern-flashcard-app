import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import {Link} from "react-router-dom";

const Card = styled.div`
  height: 350px;
  max-width: 550px;
  display: flex;
  margin: 0 auto;

  margin-top: 80px;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border-radius: 10px;

  @media (max-width: 640px) {
    margin: 100px 30px;
    height: 300px;
  }

  @media (max-width: 500px) {
    margin: 50px 30px;
  }
`;

const Header = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mt-10 text-center text-gray-50 mx-4">
        <i
          className="fas fa-atom"
          style={{fontSize: "50px", marginRight: "20px"}}
        ></i>{" "}
        Organic Chemistry | Functional Groups
      </h1>
      <Link to="/">
        <p className="my-4 text-center text-blue-500 hover:text-blue-700">
          Back to home
        </p>
      </Link>
    </div>
  );
};

const FunctionalGroupsFlashcard = () => {
  const url = `${process.env.REACT_APP_URL}/functionalgroups/random`;

  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    let cancel;
    axios
      .get(url, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setIsLoading(false);
        setItem(res.data);
      });

    return () => cancel();
  }, [url]);

  const getAnother = () => {
    let cancel;

    axios
      .get(url, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setIsLoading(false);
        setItem(res.data);
      });
    setFlipped(!flipped);
    return () => cancel();
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <img src={"/assets/Atom.svg"} alt="loading" className="loading-logo" />
      </div>
    );
  }

  if (flipped === true) {
    return (
      <div className="justify-center">
        <Header />

        <Card
          onClick={() => setFlipped(!flipped)}
          className="bg-gray-200 border border-gray-400 shadow-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            {item.name.includes("_")
              ? item.name.split("_")[0] + " " + item.name.split("_")[1]
              : item.name}
          </h2>
          <p className="text-lg text-center mb-4 font-medium">{item.use}</p>
          {item.example && (
            <p className="text-lg text-center">
              <span className="text-lg text-center mb-4 font-medium">
                example:
              </span>{" "}
              {item.example}
            </p>
          )}

          <button
            onClick={getAnother}
            className="mx-6 sm:mx-28 mt-10 flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 flex-initial"
          >
            Next
          </button>
        </Card>
      </div>
    );
  }

  if (flipped === false) {
    return (
      <div>
        <Header />
        <Card
          onClick={() => setFlipped(!flipped)}
          className="bg-gray-200 border border-gray-400 shadow-md"
        >
          {/* note: all you need is assets in the path, and react will find your image :)  */}
          <img
            src={`/assets/functionalGroupImg/${item.name}.svg`}
            style={{
              maxWidth: "350px",
              maxHeight: "200px",
              alignSelf: "center",
              justifySelf: "center",
              margin: "0 20px",
            }}
            alt="functional group"
          />
        </Card>
      </div>
    );
  }
};

export default FunctionalGroupsFlashcard;
