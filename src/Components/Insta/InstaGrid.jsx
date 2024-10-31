
import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

const InstaGrid = ({ darkMode }) => {
    const [memes, setMemes] = useState([
        "https://indianmemetemplates.com/wp-content/uploads/Doge-with-a-gun.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTso_NmeBnnon8zVnD43WiPwa_oEWhZRRyiPdnJ1OBV36mCc7O66-rmW9e-jHWhgwxxYBQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5R3oNfPzH7FZiYzgGmxmnATzRaKsj653ENA&usqp=CAU",
        "https://memes.co.in/Uploads/Media/Aug19/Sun25/249/8853d389.jpg",
        "https://allmemetemplates.files.wordpress.com/2020/02/15933273833277531914975469620300.jpg",
        "https://imgflip.com/s/meme/Two-Buttons.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK2seoR3DExH09Pe2iQNY657Re1gocNmmS6Q&usqp=CAU",
        "https://a.pinatafarm.com/574x280/aa8fe61128/this-is-fine-blank.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbdCd24AFLerb4zC-9Ba9rjc6TfttQUeKLqg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzw-aZw9BeYt7GlGgFL5pw0qeRWz7nIpcWKw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThuAgVaqr5iovs8V_m7bLvTaMfdVdROZ2Kyw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXyUKQB3DCB3wLoPCMdC_guixkHKb_nyWHcg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgzZyqKQ16kxqkggBuqzQ7vpbrIAZCZFwWjQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS86IL-pItJwf-V6kKefWmD3T_XuxpQoThD_Q&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2fgRZDL5IvKHZkpgOQo-AkZvD382JrksJyQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbceugx5TIPwXEzYc35VOhYMd5xxiuvreQJw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq2phHJ3gki12RiUzM7lONavVcX01Av3p-rg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6pQVc7XHDaQK-Umf_V6N3hXXc_M5XtQbU9rUPIUgEqxwtpGuRsr-uW2q8M5DfZ_n0jN4&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUxGLH3GwDHGFNI_fkEQCTqJo-D8z11kx0zQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Hx6xu3zjSLVXzwcVwIkIcgppiUAsdBz5pg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTFx0poUWjJYJ8V7T2BVy2rGkEJxgeY7ypTw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyhXVNv2_x-3BX2TMEAVh9aBYIatcYZaQvFqDF0xcxBYZVD4d-US981MLiGSsg9GzymtE&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmNRtkW4utJ8If0VZOqVOVzYnl9Dov_Ov5nYsFVz7tJUF1qDbs0hbzM1me3gOKmYZauCs&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdi2ZbH_YZP7ufYYnHgl071pmABHB-5GbD_A&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqCqqMh3fLLP6YFgJ8uWWAHkX0kO1o0VqMGw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw7qVjzCfY6C1rAJ2Eo9g7n5AVl-GkDyg1XA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS02_DN4b-A1o6jKnUOdYWk0iT6Ye5ZXv07-A&usqp=CAU",
    ]);

    const handleImageChange = (event, index) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let newMemes = [...memes];
                newMemes[index] = e.target.result;
                setMemes(newMemes);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <>
            <MDBContainer
                style={{
                    maxHeight: "70vh",
                    overflowY: "scroll",
                    scrollMargin: 0,
                    padding: "0 2px",
                    margin: "0 1px",
                    background: darkMode ? "black" : "white",
                    border: "1px solid rgb(100,100,100)",
                    overflowX: "hidden",
                }}
            >

                <MDBRow style={{ display: "flex", justifyContent: "center" }} >
                    {memes.map((image, index) => (
                        <MDBCol key={index} size="4" style={{ padding: "1px" }}>
                            <img
                                onClick={() => document.getElementById(`file-input-${index}`).click()}
                                style={{ aspectRatio: 1 }} src={image} alt={`Image ${index + 1}`} className="w-100" />
                            <input
                                type="file"
                                id={`file-input-${index}`}
                                style={{ display: "none" }}
                                onChange={(event) => handleImageChange(event, index)}
                            />
                        </MDBCol>
                    ))}

                </MDBRow>
            </MDBContainer>
        </>
    );
};

export default InstaGrid;
