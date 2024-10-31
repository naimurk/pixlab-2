import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle
} from "mdb-react-ui-kit";
const SafariModal = ({ showSafariModal, setshowSafariModal, dm }) => {
  return (
    <>
      <MDBModal
        setShow={setshowSafariModal}
        show={showSafariModal}
        tabIndex="-1"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <MDBModalDialog>
          <MDBModalContent style={{ overflowY: "scroll", minWidth: "280px" }}>
            <MDBModalHeader>
              <MDBModalTitle style={{ color: "black" }}>🚨</MDBModalTitle>
              <MDBBtn
                onClick={() => setshowSafariModal(false)}
                className="btn-close"
                color="none"
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <h5 style={{ color: "black", textAlign: "center" }}>
                pixlab currrently is not
                <br />
                supported on iOS and SAFARI browser
              </h5>
              <div
                style={{
                  margin: "16px 0",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "30px"
                }}
              >
                😯
              </div>

              <p style={{ margin: "0", color: "gray", textAlign: "center" }}>
                You can use any browser / OS other than Safari / iOS
              </p>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default SafariModal;
