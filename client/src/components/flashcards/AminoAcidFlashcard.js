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
    margin: 90px 30px;
  }
`;

const Header = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mt-10 text-center text-gray-50 mx-4">
        <i
          class="fas fa-vial"
          style={{fontSize: "50px", marginRight: "10px"}}
        ></i>{" "}
        Amino Acids
      </h1>
      <Link to="/">
        <p className="my-4 text-center text-purple-500 hover:text-purple-700">
          Back to home
        </p>
      </Link>
    </div>
  );
};

const AminoAcidFlashcard = () => {
  const url = `${process.env.REACT_APP_URL}/aminoacids/random`;

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
            {item.name} - {item.symbol}
          </h2>
          <p className="text-lg text-center mb-4 font-medium">{item.code}</p>
          <p className="text-lg text-center">{item.group}</p>

          <button
            onClick={getAnother}
            className="mx-6 sm:mx-28 mt-10 flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-purple-500 hover:bg-purple-700 flex-initial"
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
              maxWidth: "400px",
              maxHeight: "250px",
              alignSelf: "center",
              justifySelf: "center",
              margin: "0 20px",
            }}
            alt="molecule"
          />
        </Card>
      </div>
    );
  }
};

export default AminoAcidFlashcard;
