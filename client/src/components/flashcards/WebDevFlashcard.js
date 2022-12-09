import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import {Link} from "react-router-dom";
import parse from "html-react-parser";

const Card = styled.div`
  height: min-content;
  min-height: 350px;
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
  }
  @media (max-width: 500px) {
    margin: 90px 30px;
    justify-content: center;
    padding: 10px;
  }
  @media (max-width: 300px) {
    max-height: max-content;
  }
`;

const AnswerDiv = styled.div`
  p,
  code {
    margin-bottom: 10px;
  }

  h4 {
    font-weight: 600;
  }
  code {
    background: #ccc;
  }
  code,
  pre,
  p,
  li,
  h4 {
    font-size: 12px;
  }
`;
const QuestionDiv = styled.div`
  code {
    background: #ccc;
  }
`;

const Header = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mt-10 text-center text-gray-50">
        <i class="fas fa-laptop-code"></i> Web Development
      </h1>
      <Link to="/">
        <p className="my-4 text-center text-yellow-500 hover:text-yellow-700">
          Back to home
        </p>
      </Link>

      <p className="my-8 text-center text-yellow-300 text-xs">
        Note: these are not my own questions. They come from{" "}
        <a
          className="hover:text-yellow-700"
          href="https://30secondsofinterviews.org/"
        >
          https://30secondsofinterviews.org/
        </a>
      </p>
    </div>
  );
};

const WebDevFlashcard = () => {
  const url = `${process.env.REACT_APP_URL}/webdev/random`;

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
        setItem(res.data);

        setIsLoading(false);
        console.log(res);
      });

    return () => cancel();
  }, [url]);
  console.log(item.question);
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

  if (isLoading || item.question === undefined) {
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
          <AnswerDiv>{parse(item.answer)}</AnswerDiv>
          <button
            onClick={getAnother}
            className="mx-6 sm:mx-28 mt-10 flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-700 flex-initial"
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
          <QuestionDiv className="text-2xl font-bold text-center mb-6">
            {parse(item.question)}
          </QuestionDiv>
        </Card>
      </div>
    );
  }
};

export default WebDevFlashcard;
