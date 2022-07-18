import { Grid } from "@mui/material";

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
    setLoadComplete: (arg0: boolean) => void;
};

const Result = (props: ResultProps) => {
    const koreanGender = props.resultData.gender === "man" ? "남자" : "여자";

    let isValidFace = props.resultData.content === "No face";
    const content = isValidFace ? "얼굴 인식에 실패했습니다. 전체 얼굴이 나온 사진으로 다시 시도 바랍니다." : `${props.subtitle} : ${props.resultData.class}`;

    const handleRetry = () => {
        props.setLoadComplete(false);
    };

    return (
        <div className="result_wrapper">
            <h1>{props.title}</h1>
            <div>{koreanGender} 편</div>
            <div className="result_section">
                <h3>결과</h3>
                <img src={props.imgUrl} alt="사진" />
                <div></div>
                <h2>{content}</h2>
                <p className="content_section">{props.resultData.content}</p>
                <div></div>
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
                .result_wrapper {
                    padding: 1rem;
                    color: #ffffff;
                }
                @media (min-width: 768px) {
                    .share_section {
                        margin: 3rem 1rem;
                        padding: 10px 50px;
                    }
                }
                .retry_button {
                    display: inline-block;
                    padding: 10px;
                    border: 1px solid #ffffff;
                    border-radius: 5px;
                }
                .result_section {
                    overflow: hidden;
                }
                .content_section {
                    text-align: center;
                    display: inline-block;
                    max-width: 500px;
                    margin-bottom: 3rem;
                    border: 1px solid #ffffff;
                    border-radius: 5px;
                    padding: 1rem;
                    1color: #000000;
                    1background-color: rgba(255, 255, 255, 0.7);
                }
            `}</style>
        </div>
    );
};

export default Result;
