import { Grid } from "@mui/material";

type GridWithImageProps = {
    imgUrl: string;
    inner: JSX;
};

export default function GridWithImage(props: GridWithImageProps): JSX.Element {
    return (
        <>
            <Grid container spacing={0.5}>
                <Grid item xs={12} md={4}>
                    <div style={{ position: "relative" }}>
                        <img src={props.imgUrl} alt="AI" />
                    </div>
                </Grid>
                <Grid item xs={12} md={6} style={{ margin: "auto 0", zIndex: "5" }}>
                    <div className="main_text">{props.inner}</div>
                </Grid>
            </Grid>
            <style jsx>{`
                .main_text {
                    color: #ffffff;
                    z-index: 5;
                }
                img {
                    height: 400px;
                    object-fit: fill;
                }
            `}</style>
        </>
    );
}
