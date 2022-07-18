import { Grid } from "@mui/material";

type GridWithImageProps = {
    imgUrl: string;
    inner: JSX.Element;
};

export default function GridWithImage(props: GridWithImageProps): JSX.Element {
    return (
        <div className="grid_wrapper">
            <Grid container spacing={0.5}>
                <Grid item xs={12} md={4}>
                    <div className="img_wrapper">
                        <img src={props.imgUrl} alt="AI" />
                    </div>
                </Grid>
                <Grid item xs={12} md={6} style={{ margin: "auto 0", zIndex: "5" }}>
                    <div className="main_text">{props.inner}</div>
                </Grid>
            </Grid>
            <style jsx>{`
                .grid_wrapper {
                    height: 100vh;
                    margin: 0 auto;
                    width: 100%;
                }
                .main_text {
                    color: #ffffff;
                    z-index: 5;
                }
                .img_wrapper {
                    position: relative;
                    display: flex;
                    justify-content: center;
                }
                img {
                    height: 400px;
                    object-fit: fill;
                }
            `}</style>
        </div>
    );
}
