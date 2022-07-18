import { ChangeEvent } from "react";

type TestInputProps = {
    setLoading: Function;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeGender: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    imgUrl: string;
    title: string;
    contentDetail: string;
    name: string;
    gender: string;
};

const TestInput = (props: TestInputProps) => {
    return (
        <>
            <div className="test_wrapper">
                <div style={{ margin: "2rem" }}>
                    <img src={props.imgUrl} width="500px" alt="사진" />
                </div>
                <h1>{props.title}</h1>
                <pre>{props.contentDetail}</pre>
                <div>
                    <h5>성별을 선택해주세요.</h5>
                    <input id="select_gender" name="select_gender" value="woman" type="radio" onChange={props.onChangeGender} defaultChecked />
                    <label>여성</label>
                    <input id="select_gender" name="select_gender" value="man" type="radio" onChange={props.onChangeGender} />
                    <label>남성</label>
                </div>

                <div style={{ margin: "30px" }}>
                    <div className="file_input_area">
                        <input type="file" id="input-file" accept="image/png, image/jpeg" style={{ visibility: "hidden" }} onChange={props.onChange} />
                        <div>사진 파일 드래그</div>
                    </div>
                    <label className="file_input_button" htmlFor="input-file">
                        혹은 이 버튼으로 업로드
                    </label>
                </div>
                <p>
                    안심하세요. <br />
                    저희는 완전히 학습된 머신러닝 모델을 사용합니다. <br />
                    사용자의 이미지는 절대 서버에 저장 및 모델 학습에 사용되지 않습니다.
                </p>
                <button className="submit_btn" onClick={props.onSubmit}>
                    제출
                </button>
            </div>
            <style jsx>{`
                .test_wrapper {
                    color: #ffffff;
                    padding: 2rem;
                }
                .submit_btn {
                    border: 1px solid #ffffff;
                    border-radius: 5px;
                    background: none;
                    color: #ffffff;
                    display: block;
                    padding: 5px 20px;
                    margin: 0 auto;
                }
                .file_input_button {
                    cursor: pointer;
                }
                .file_input_area {
                    border: 1px solid #ffffff;
                    text-align: center;
                    display: inline-block;
                    font-size: 0.5rem;
                }
                #input-file {
                    padding: 10px;
                    width: 100%;
                    display: block;
                }
            `}</style>
        </>
    );
};

export default TestInput;
