import { Grid } from "@mui/material";
import Router from "next/router";

type ResultProps = {
    resultData: {
        class: string;
        content: string;
        gender: string;
    };
    name: string;
    title: string;
    subtitle: string;
    imgUrl: string;
};

const Result = (props: ResultProps) => {
    const koreanGender = props.resultData.gender === "man" ? "남자" : "여자";

    let isValidFace = props.resultData.content === "No face";
    const content = isValidFace ? "님 사람 아닌데요?" : `${props.subtitle} : ${props.resultData.content}`;

    const handleRetry = () => {
        Router.push(`/`);
    };

    return (
        <div className="loading_wrapper">
            <h1>{props.title}</h1>
            <div>{koreanGender} 편</div>
            <div>
                <h3>결과</h3>
                <img src={props.imgUrl} alt="사진" />
                <p>{content}</p>
                <div className="retry_button" onClick={handleRetry}>
                    다시 하기
                </div>
            </div>
            <div className="share_section">
                <h3>친구와 함께 즐겨보세요!</h3>
                <Grid container spacing={0} style={{ justifyContent: "space-evenly" }}>
                    <Grid sm={6} md={2}>
                        카카오톡
                    </Grid>
                    <Grid sm={6} md={2}>
                        인스타그램
                    </Grid>
                    <Grid sm={6} md={2}>
                        페이스북
                    </Grid>
                    <Grid sm={6} md={2}>
                        트위터
                    </Grid>
                </Grid>
            </div>
            <style jsx>{`
                .loading_wrapper {
                    width: 100vw;
                    height: 100vh;
                    color: #ffffff;
                    display: table-cell;
                    vertical-align: middle;
                }
                .share_section {
                    margin: 3rem 1rem;
                    padding: 10px 50px;
                }
                .retry_button {
                    display: inline-block;
                    padding: 10px;
                    border: 1px solid #ffffff;
                    border-radius: 5px;
                }
            `}</style>
        </div>
    );
};

export default Result;
