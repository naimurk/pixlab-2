import Link from "next/link";

const Sponsor2 = ({ dm }) => {
  return (
    <>
      <Link
        to="https://www.prodpapa.com/logo.jpg"
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
              Public page for products, discover new tools and gather feedback.
            </p>
          </div>
        </div>
      </Link>

      {/* <Link to="https://twitter.com/imkrishgohil" style={{ minWidth: "280px", marginTop: "16px", borderRadius: "8px", background: dm ? "" : "white", color: dm ? "white" : "black", }} target='_blank' className='sponsor' >

        <div style={{ display: 'flex', alignItems: "center" }} >
          <img src="https://www.pixlab.in/test67.webp" style={{ height: "30px", width: "30px", marginRight: "16px", borderRadius: "20%" }} alt="" />
          <p style={{ margin: 0 }} >
            Your Ad Here
            <br />Connect with Us <FaLongArrowAltRight />
          </p>
        </div>
      </Link> */}
    </>
  );
};

export default Sponsor2;
