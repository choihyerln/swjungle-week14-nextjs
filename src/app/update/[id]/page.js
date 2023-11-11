"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const router = useRouter();
    const params = useParams(); // 아이디 가져오기 위해 params 가져옴
    // read는 server component이므로 그대로 가져올 수 없음
    useEffect(() => {
        fetch(`http://localhost:8000/topics/${params.id}`)
            .then(resp => resp.json())
            .then(result => {
                console.log(result);
                setTitle(result.title);
                setBody(result.body);
            });
    }, []);
    return (
        <form onSubmit={(e) => {
            e.preventDefault(); // 이걸 해야 버튼 클릭해도 url 변경 없음
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, body })
            }
            // 서버로 전송해서 데이터 추가해야함
            fetch(`http://localhost:8000/topics/${params.id}`, options)
                .then(resp => resp.json())
                .then(result => {
                    console.log(result);
                    const lastId = result.id;   // 마지막에 값에 생성된 id
                    router.push(`/read/${lastId}`);
                    router.refresh();   // 서버 컴포넌트 리프레쉬
                });
        }}>
            <p>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
            </p>
            <p>
                <textarea
                    name="body"
                    placeholder="body"
                    value={body}
                    onChange={(e) => {
                        setBody(e.target.value)
                    }}>
                </textarea>
            </p>
            <p>
                <button type="submit" value="update">update</button>
            </p>
        </form>
    )
}