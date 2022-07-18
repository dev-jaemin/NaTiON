import { Grid } from "@mui/material";

export default function Footer(): JSX.Element {
    return (
        <>
            <div className="footer_wrapper">
                <Grid container spacing={1}>
                    <Grid item sm={12} md={4} lg={3}>
                        {/* TODO : 개발자들 연락처 어떻게 정할지 논의 필요*/}
                        인스타그램 페이스북 깃헙
                    </Grid>

                    <Grid item sm={12} md={4} lg={3}>
                        <div className="copyright">ⓒ 2022. 김재민, 김태훈 All rights reserved.</div>
                    </Grid>
                </Grid>
            </div>
            <style jsx>{`
                .footer_wrapper {
                    z-index: 30;
                    padding: 2rem;
                    background-color: #333;
                    color: #ffffff;
                }
                .copyright {
                    color: grey;
                    font-size: 0.8rem;
                }
            `}</style>
        </>
    );
}
