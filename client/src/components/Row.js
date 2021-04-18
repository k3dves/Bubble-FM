import React, { useState, useEffect } from "react";

document.getElementsByClassName("file-name");
export const Row = () => {
  const [rows, setrows] = useState([]);
  const [path, setPath] = useState("");

  function updateList(event) {
    event.persist();
    if (event.target.tagName === "P") {
      setPath(path + "/" + event.target.innerText);
    }
  }

  function downloadFile(event) {
    console.log(event.target);
  }
  function navigate(event) {
    event.persist();
    if (event.target.nodeName === "P") {
      let index = parseInt(event.target.id) + 1;
      let newPath = path.split("/").slice(0, index).join("/");
      console.log(newPath);
      setPath(newPath);
    }
  }
  useEffect(() => {
    fetch("/folders?path=" + path)
      .then((r) => r.json())
      .then((data) => setrows(data));
  }, [path]);

  return (
    <div className="container-fluid bg-light p-0">
      <div className="nav">
        {path.split("/").map((e, i) => {
          if (i === 0) {
            e = "~";
          }
          return (
            <p className="navPath btn" id={i} key={i} onClick={navigate}>
              {e} |
            </p>
          );
        })}
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Size</th>
            <th scope="col">Modified</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            return (
              <tr className={r.isDir ? "dir" : "file"} key={i}>
                <td onClick={r.isDir ? updateList : downloadFile} key={i}>
                  <p>{r.name}</p>
                </td>
                <td>{r.size}</td>
                <td>{r.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
