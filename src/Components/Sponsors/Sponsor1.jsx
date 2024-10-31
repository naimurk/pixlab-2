import {Link} from "react-router-dom";
const Sponsor1 = ({ dm }) => {
  return (
    <>
      <Link
        to="https://www.prodpapa.com"
        style={{
          minWidth: "280px",
          marginTop: "16px",
          borderRadius: "8px",
          border: dm ? "1px solid rgb(50,50,50)" : "1px solid silver",
          color: dm ? "white" : "black",
          background: dm ? "black" : "white"
        }}
        target="_blank"
        className="sponsor"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://www.prodpapa.com/logo.jpg"
            style={{
              height: "40px",
              width: "40px",
              marginRight: "16px",
              borderRadius: "20%"
            }}
            alt=""
          />
          <div>
            <h6 style={{ marginBottom: "4px" }}>ProdPapa</h6>
            <p style={{ margin: 0 }}>
              Hey, I am the creator of pixlab. I am looking for frontend
              developer job
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Sponsor1;
