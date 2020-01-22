import React, { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { loader } from "graphql.macro";
import { Pagination, Modal, Table, Tag } from "antd";

import "./style.scss";
import Card from "../card";
import Column from "antd/lib/table/Column";

const All_PERSONS = loader("../../graphql/getAllPeople.graphql");
const PERSON_IN_DETAILS = loader("../../graphql/personInDetails.graphql");

const CardContainer = () => {
  const [people, setpeople] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "noTitle",
    films: [],
    searchInfo: { id: "" }
  });
  const [totalPeople, setTotalPeople] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const client = useApolloClient();
  const handlePagination = data => {
    setCurrentPage(data);
  };
  const modalFilmsColumns = [
    { title: "Film Name", dataIndex: "film", key: "film" },
    { title: "Planets", dataIndex: "planets", key: "planets" }
  ];
  useEffect(() => {
    client
      .query({
        query: All_PERSONS
      })
      .then(data => {
        setpeople(data.data.allPeople);
        setTotalPeople(data.data.allPeople.totalCount);
      });
  }, [client]);
  const openModal = data => {
    console.log("DSSD", data);
    setModalVisible(true);
    client
      .query({
        query: PERSON_IN_DETAILS,
        variables: {
          id: data.id
        }
      })
      .then(response => {
        console.log("data", response);
        setModalContent(preState => ({
          ...preState,
          films: response.data.person.filmConnection.films.map(
            (item, index) => ({
              key: index,
              film: item.title,
              planets: item.planetConnection.planets
            })
          ),
          title: data.name,
          searchInfo: data
        }));
      });
  };
  const handleModalCancel = e => {
    setModalVisible(false);
  };
  return (
    <div className="card-section">
      <section className="card-container">
        {people &&
          people.people &&
          people.people.map((item, index) => {
            const currentIndexes = currentPage !== 1 ? currentPage * 10 - 9 : 1;
            if (currentIndexes - 1 <= index && currentIndexes + 9 > index) {
              return <Card key={item.id} openModal={openModal} data={item} />;
            } else {
              return null;
            }
          })}
      </section>
      {people && (
        <Pagination
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          onChange={handlePagination}
          showLessItems={true}
          pageSize={10}
          className="card-pagination"
          defaultCurrent={1}
          total={totalPeople}
        />
      )}

      <Modal
        title={modalContent.title}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
        on
        visible={modalVisible}
      >
        <Table dataSource={modalContent.films}>
          <Column title="Film name" dataIndex="film" key="film" />
          <Column
            title="Planets"
            dataIndex="planets"
            key="planets"
            render={planets => (
              <span>
                {planets.map(planet => (
                  <Tag color="blue" key={planet.name}>
                    {planet.name}
                  </Tag>
                ))}
              </span>
            )}
          />
        </Table>
      </Modal>
    </div>
  );
};

export default CardContainer;
