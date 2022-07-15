import { Grid } from "@mui/material";
import Link from "next/link";
import Router from "next/router";
import testData from "../../testInfo.json";
import NationTest from "./NationTest";

export default function TestGrid(): JSX.Element {
    // const router = useRouter();
    const handleClick = (name: string) => {
        console.log(name);
        Router.push(`/test?name=${name}`);
    };

    return (
        <div className="grid_wrapper">
            <Grid container spacing={2}>
                {Object.keys(testData).map((item, index) => {
                    return (
                        <Grid item sm={12} lg={6} key={index}>
                            <div
                                className="grid_item"
                                onClick={() => handleClick(item)}
                                style={{ background: `url("${testData[item].imgUrl}") no-repeat right center #322F9C` }}
                            >
                                <h3>{testData[item].title}</h3>
                                <p>{testData[item].content}</p>
                                <div className="grid_item_btn">확인하러 가기 ▶</div>
                            </div>
                        </Grid>
                    );
                })}
            </Grid>
            <style jsx>{`
                @media (min-width: 768px) {
                    .grid_wrapper {
                        padding: 0px 10rem;
                    }
                }
                .grid_item {
                    position: relative;
                    margin: 0px 20px;
                    padding: 30px;
                    height: 250px;
                    z-index: 30;
                    border: 2px solid #ffffff;
                    border-radius: 10px;
                    color: #ffffff;
                    font-weight: 700;
                    background-size: cover;
                    background-blend-mode: multiply;
                    cursor: pointer;
                }
                .grid_item_btn {
                    margin-top: 0px;
                    display: inline-block;
                    padding: 10px;

                    border: 2px solid #ffffff;
                    border-radius: 5px;
                }
            `}</style>
        </div>
    );
}