import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import style from "./Album.module.css";
import AddNewAlbum from "./AddNewAlbum";

export default function Album() {
  const [album, setAlbum] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [fetchedData, setFetchedData] = useState("");

  function onAddNewAlbum(data) {
    setAddNew(true);
    console.log(data);
    setFetchedData(data);
  }

  useEffect(() => {
    (async function fetchAlbumData() {
      const albumArray = [];
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const responseJSON = await response.json();

      for (let i = 0; i < responseJSON.length; i += 10) {
        let emptyArray = [];
        emptyArray = responseJSON.slice(i, [i + 10]);
        albumArray.push(emptyArray);
      }
      setAlbum(albumArray);
    })();
  }, []);

  return (
    <React.Fragment>
      <header>
        <h1 className={`display-1 text-center py-5 ${style.albumH1}`}>
          {" "}
          <img
            src="https://cdn-icons-png.flaticon.com/128/3669/3669986.png"
            width={"90px"}
            alt="..."
          />{" "}
          Album Collection{" "}
        </h1>
      </header>
      <main className={style.albumMain}>
        <section className={style.albumSection}>
          {album.map((album) => {
            return <Carousel album={album} key={album[0].userId} />;
          })}
          {addNew && (
            <div
              style={{
                borderRadius: "0.75rem",
                backgroundColor: "aliceblue",
                cursor: "pointer",
                border: "1px solid black",
                boxShadow: "0 0 10px 1.5px #888",
              }}
            >
              <img
                height={"250px"}
                width={"400px"}
                style={{ borderRadius: "1rem" }}
                src="https://images.freeimages.com/clg/images/31/311968/free-vector-summer-beach-image_f.jpg"
                alt="..."
              />
              <div
                style={{
                  backgroundColor: "rgba(240,248,255,0.9)",
                  borderRadius: "0.5rem",
                  padding: "10px",
                }}
              >
                <h5
                  style={{ textAlign: "center", textTransform: "capitalize" }}
                >
                  {fetchedData.title} {fetchedData.id}
                </h5>
                <p style={{ textAlign: "center" }}>{fetchedData.body}</p>
              </div>
            </div>
          )}
          <AddNewAlbum onAddNewAlbum={onAddNewAlbum} />
        </section>
      </main>
      <footer className={style.albumFooter}>
        <p>
          All trademarks are properties of their respective owners. 2023-2023 ©
          Album Collection™ Ltd. All rights reserved.
        </p>
      </footer>
    </React.Fragment>
  );
}
