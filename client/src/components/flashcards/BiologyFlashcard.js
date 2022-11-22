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
  justify-content: space-around;
  align-content: center;
  border-radius: 10px;
  padding: 40px 20px;

  & p {
    @media (max-width: 640px) {
      font-size: 14px;
    }
    @media (max-width: 400px) {
      font-size: 10px;
      margin: 5px 10px;
    }
  }

  & button {
    @media (max-width: 350px) {
      margin: 10px;
    }
  }

  @media (max-width: 640px) {
    margin: 100px 30px;
    height: 300px;
  }
  @media (max-width: 500px) {
    margin: 90px 30px;
    justify-content: center;
    padding: 10px;
    height: 325px;
  }
  @media (max-width: 300px) {
    max-height: max-content;
  }
`;

const Header = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mt-10 text-center text-gray-50">
        <i
          className="fas fa-dna"
          style={{fontSize: "50px", marginRight: "10px"}}
        ></i>{" "}
        Biology
      </h1>
      <Link to="/">
        <p className="my-4 text-center text-green-500 hover:text-green-700">
          Back to home
        </p>
      </Link>
    </div>
  );
};

const BiologyFlashcard = () => {
  const url = `${process.env.REACT_APP_URL}/biology/random`;

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
          {item.name === "Darwin's four postulates" && (
            <p className="text-lg text-center mx-12">{item.definition}</p>
          )}
          {item.name !== "Darwin's four postulates" && (
            <p className="text-lg text-center mx-12 font-semibold">
              {item.definition}
            </p>
          )}

          {item.additionalInfo1 && (
            <p className="text-lg text-center mx-12">{item.additionalInfo1}</p>
          )}

          {item.additionalInfo2 && (
            <p className="text-lg text-center mx-12">{item.additionalInfo2}</p>
          )}

          {item.additionalInfo3 && (
            <p className="text-lg text-center mx-12">{item.additionalInfo3}</p>
          )}

          <button
            onClick={getAnother}
            className="mx-6 sm:mx-28 mt-10 flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-700 flex-initial"
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
          <h2 className="text-2xl font-bold text-center mb-6">{item.name}</h2>
        </Card>
      </div>
    );
  }
};

export default BiologyFlashcard;
