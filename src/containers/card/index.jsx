import React, { useState, useEffect } from "react";
import { Card as AntCard, Button } from "antd";

import API from "../../config/axios";
import { API_KEY } from "../../config/giphyApi";

const { Meta } = AntCard;
const style = {
  card: {
    width: "300px",
    maxHeight: "250px",
    marginTop: "20px",
    marginLeft: "5px",
    marginRight: "5px"
  }
};
const Card = ({ openModal, data }) => {
  const [imgSrc, setimgSrc] = useState("");
  const [loading, setloading] = useState(true);
  const { name, id, homeworld } = data;
  useEffect(() => {
    API.get("search", {
      params: {
        api_key: API_KEY,
        q: name,
        limit: 1
      }
    }).then(data => {
      data.data.data[0]
        ? setimgSrc(data.data.data[0].images.original.url)
        : setimgSrc("http://www.bbmgif.com/images/no/en_notavailable.gif");
    });
  }, []);
  const handleLoading = () => {
    setloading(false);
  };
  const handleOpenModal = () => {
    console.log("Open Modal");
    openModal({ name, id });
  };

  return (
    <AntCard
      hoverable
      style={style.card}
      cover={
        <>
          <img
            onLoad={() => {
              handleLoading();
            }}
            alt={name}
            width="200px"
            height="150px"
            src={imgSrc}
          />
          {loading && <span>Loading</span>}
        </>
      }
    >
      <Meta title={name} description={`From: ${homeworld.name}`} />
      <Button type="primary" size="small" block onClick={handleOpenModal}>
        ShowMore
      </Button>
    </AntCard>
  );
};

export default Card;
