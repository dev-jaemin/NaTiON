import { Grid } from "@mui/material";
import Router from "next/router";
import testData from "../../testInfo.json";

export default function TestGrid(): JSX.Element {
    // const router = useRouter();
    const handleClick = (name: string) => {
        Router.push(`/test/${name}`);
    };

    return (
        <div className="grid_wrapper">
            <Grid container spacing={2}>
                {Object.keys(testData).map((item, index) => {
                    return (
                        <Grid item sm={12} md={6} key={index}>
                            <div>
                                <div
                                    className="grid_item"
                                    onClick={() => handleClick(item)}
                                    style={{ background: `url("${testData[item as keyof typeof testData].imgUrl}") no-repeat center center #ffffff` }}
                                >
                                    <h3>{testData[item as keyof typeof testData].title}</h3>
                                    <p style={{ height: "5rem" }}>{testData[item as keyof typeof testData].content}</p>
                                    <div className="grid_item_btn">확인하러 가기 ▶</div>
                                </div>
                            </div>
                        </Grid>
                    );
                })}
            </Grid>
            <style jsx>{`
                .grid_wrapper {
                    padding-bottom: 2rem;
                }
                @media (min-width: 768px) {
                    .grid_wrapper {
                        padding: 0rem 10rem 2rem 10rem;
                    }
                }
                .grid_item {
                    position: relative;
                    margin: 0px 20px;
                    padding: 30px;
                    min-height: 300px;
                    z-index: 30;
                    border: 2px solid #ffffff;
                    border-radius: 10px;
                    font-weight: 700;
                    background-size: cover;
                    background-blend-mode: multiply;
                    cursor: pointer;
                    overflow: hidden;
                }
                .grid_item > * {
                    display: inline-block;
                    border-radius: 5px;
                    padding: 5px;
                    background-color: rgba(255, 255, 255, 0.9);
                    color: #000000 !important;
                }
                .grid_item_btn {
                    margin-top: 0px;
                    display: inline-block;
                    padding: 10px;

                    border: 2px solid #000000;
                    border-radius: 5px;
                }
            `}</style>
        </div>
    );
}
