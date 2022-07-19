import { Grid } from "@mui/material";

export default function Footer(): JSX.Element {
    return (
        <>
            <div className="footer_wrapper" onClick={() => console.log("hhh")}>
                <Grid container>
                    <Grid item sm={12} md={3} lg={3}>
                        <div className="github_section">
                            <img src="/image/github.png" alt="github" width="32px" />
                            <a href="https://github.com/dev-jaemin">김재민</a>
                            <a href="https://github.com/twodf78">김태훈</a>
                        </div>
                    </Grid>

                    <Grid item sm={12} md={3} lg={3}>
                        <div className="copyright">ⓒ 2022. 김재민, 김태훈 All rights reserved.</div>
                    </Grid>
                </Grid>
            </div>
            <style jsx>{`
                .footer_wrapper {
                    z-index: 50;
                    padding: 2rem;
                    background-color: #333;
                    color: #ffffff;
                }
                .copyright {
                    color: grey;
                    font-size: 0.8rem;
                    padding: 5px;
                }
                .github_section {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .github_section > * {
                    z-index: 50;
                    padding: 0rem 1rem;
                    text-decoration: none;
                }
            `}</style>
        </>
    );
}
