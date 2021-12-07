import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
import styled from 'styled-components';
import { toast } from 'react-toastify';
// import { upload } from '../../common/AuthService'
import authHeader from '../../common/AuthHeader';
import axios from 'axios';
const Styles = {
    container: {
        height: "80%",
    },
    imageHolder: {
        height: 350,
    },
    recentPredictions: {
        margin: '40px 0 0',
        background: '#dac2ff',
        padding: ' 10px',
    },
    recentImages: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        minHeight: 300,
        width: '80%',
        flexWrap: "wrap",
    },
    singleRecent: {
        height: 70,
        width: 50,
        border: "1px solid grey",
    }
}

const API_URL = `${process.env.REACT_APP_BACKEND_URL}`;

function App() {
    const [isModelLoading, setIsModelLoading] = useState(false)
    const [model, setModel] = useState(null)
    const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState([])
    const [history, setHistory] = useState([])
    const [feedText, setFeedText] = useState("");
    const [fileName, setFileName] = useState("");

    const imageRef = useRef()
    const textInputRef = useRef()
    const fileInputRef = useRef()

    const loadModel = async () => {
        setIsModelLoading(true)
        try {
            const model = await mobilenet.load();
            // const predictions = await model.classify(img);
            setModel(model)
            setIsModelLoading(false)
        } catch (error) {
            console.log(error)
            setIsModelLoading(false)
        }
    }

    const uploadImage = (e) => {
        const { files } = e.target
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0])
            setImageURL(url);
            setFileName(files[0]);
        } else {
            setImageURL(null)
        }
    }

    const identify = async () => {
        textInputRef.current.value = ''
        const results = await model.classify(imageRef.current)
        setResults(results)
    }

    const handleOnChange = async (e) => {
        e.preventDefault()
        setImageURL(e.target.value)
        setResults([]);
    }


    const submitFormEntry = async () => {

        if (fileName === "") return toast.error("You cant upload an empty data")
        if (feedText === "") return toast.error("Please fill the post text")

        try {
            if (fileName !== "") {
                const formData = new FormData();

                formData.append("feedText", feedText)
                formData.append("feedImage", fileName)

                // console.log("feedText is ", feedText);
                console.log("feedImg is ", fileName);
                // for (var key of formData.entries()) {
                //     console.log(key[0] + ', ' + key[1]);
                // }

                const data = {
                    feedText
                }
                const result = await axios({
                    method: 'POST',
                    url: API_URL + "feeds/create",
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': "*",
                        'x-access-token': authHeader()
                    },
                })
                console.log(result)
                if (result.status < 300) toast.success(result.data.message);
                if (result.status > 300) toast.success("upload failed");

                // const response = await upload(formData)
            }
        } catch (e) {
            console.log(e)
        }

    }

    const triggerUpload = () => {
        fileInputRef.current.click()
    }

    useEffect(() => {
        loadModel()
    }, [])

    useEffect(() => {
        if (imageURL) {
            setHistory([imageURL, ...history])
        }
    }, [imageURL])

    if (isModelLoading) {
        return <h2>Model Loading...</h2>
    }

    return (
        <div style={Styles.container}>
            <h1 className='header'>Image Identification</h1>
            <div className='inputHolder'>
                <form onSubmit={handleOnChange} encType='multipart/form-data' >
                    <InputField type="text" name="feedText" value={feedText} onChange={(e) => setFeedText(e.target.value)} /><br />
                    <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} filename="feedImage" />
                    <button className='uploadImage' onClick={triggerUpload}>Upload Image</button>
                    {/* <span className='or'>OR</span> */}
                    {/* <input type="text" placeholder='Paster image URL' ref={textInputRef} onChange={handleOnChange} name="" /> */}

                    <button onClick={submitFormEntry}>Upload</button>

                </form>
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} style={Styles.imageHolder} />}
                    </div>
                    {results.length > 0 && <div className='resultsHolder'>
                        {results.map((result, index) => {
                            return (
                                <div className='result' key={result.className}>
                                    <span className='name'>{result.className}</span>
                                    <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'>Best Guess</span>}</span>
                                </div>
                            )
                        })}
                    </div>}
                </div>
                {/* {imageURL && <button className='button' onClick={identify}>Identify Image</button>} */}
            </div>
            {history.length > 0 && <div className="recentPredictions" style={Styles.recentPredictions}>
                <h2>Viewed Images</h2>
                <div className="recentImages" style={Styles.recentImages}>
                    {history.map((image, index) => {
                        return (
                            <div style={Styles.singleRecent} className="recentPrediction" key={`${image}${index}`}>
                                <img src={image} alt='Recent Prediction' onClick={() => setImageURL(image)} style={{ maxWidth: '350px', height: '150px' }} />
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    );
}

export default App;


const InputField = styled.input`
    margin:10px;
    margin-bottom: 30px;
    width: 400px;
    border-radius: 10px;
    height: 50px;
    border: 1px solid grey;

    box-shadow: 1px 1px 5px 0px rgba(217,94,211,0.47);
-webkit-box-shadow: 1px 1px 5px 0px rgba(217,94,211,0.47);
-moz-box-shadow: 1px 1px 5px 0px rgba(217,94,211,0.47);

::placeholder,
::-webkit-input-placeholder {
  color: grey;
  margin-left: 30px;
  font-size: 1.5em;
  padding-left: 50px;

}
:-ms-input-placeholder {
   color: red;
   margin-left: 40px;
   padding-left: 50px;
}
`