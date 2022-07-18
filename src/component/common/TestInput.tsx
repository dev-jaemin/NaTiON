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
    imgAttachAlarm: React.RefObject<HTMLDivElement>;
};

const TestInput = (props: TestInputProps) => {
    return (
        <>
            <div className="test_wrapper">
                <div style={{ margin: "1rem", overflow: "hidden" }}>
                    <img src={props.imgUrl} width="500px" alt="사진" style={{ objectFit: "cover" }} />
                </div>
                <h1>{props.title}</h1>
                <pre>{props.contentDetail}</pre>
                <div style={{ marginTop: "5rem" }}>
                    <h5>성별을 선택해주세요.</h5>
                    <input id="select_gender" name="select_gender" value="woman" type="radio" onChange={props.onChangeGender} defaultChecked />
                    <label>여성</label>
                    <input id="select_gender" name="select_gender" value="man" type="radio" onChange={props.onChangeGender} />
                    <label>남성</label>
                </div>

                <div className="attach_wrapper">
                    <div style={{ maxWidth: "500px" }}>
                        <input type="file" id="input-file" accept="image/png, image/jpeg" style={{ display: "none" }} onChange={props.onChange} />
                        <label className="file_input_button" htmlFor="input-file">
                            <img src="/image/attach_icon.png" alt="attach icon" />
                            얼굴 사진 업로드
                        </label>
                        <div className="complete_attach_photo" ref={props.imgAttachAlarm}>
                            사진 첨부 완료!
                        </div>
                    </div>
                </div>
                <p style={{ fontSize: "0.8rem", opacity: "0.9" }}>
                    안심하세요. <br />
                    저희는 완전히 학습된 AI모델을 사용합니다. <br />
                    사용자의 사진은 서버에 저장되거나, <br />
                    모델 학습에 사용되지 않습니다. <br />
                </p>
                <button className="submit_btn" onClick={props.onSubmit}>
                    제출
                </button>
            </div>
            <style jsx>{`
                .submit_btn {
                    display: block;
                    margin: 0 auto;
                    margin-top: 3rem;
                    padding: 1rem 4rem;

                    border: 1px solid #ffffff;
                    border-radius: 5px;
                    background: none;
                    color: #ffffff;
                    font-size: 1.2rem;
                    font-weight: 700;
                }
                .file_input_button {
                    cursor: pointer;
                }
                .file_input_button {
                    display: flex;
                    padding: 1rem;
                    justify-content: center;
                    align-items: center;

                    border: 1px solid #ffffff;
                    border-radius: 5px;
                    background-color: #ffffff;
                    color: #000000;
                    font-weight: 700;
                }
                .complete_attach_photo {
                    display: none;
                    padding: 0.5rem;
                    background-color: green;
                    border-radius: 10px;
                }
                .attach_wrapper {
                    display: flex;
                    justify-content: center;
                    margin: 2rem;
                }
            `}</style>
        </>
    );
};

export default TestInput;
