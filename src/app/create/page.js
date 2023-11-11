"use client";
import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
    return (
        <form onSubmit={(e) => {
            e.preventDefault(); // 이걸 해야 버튼 클릭해도 url 변경 없음
            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
            }
            // 서버로 전송해서 데이터 추가해야함
            fetch(process.env.NEXT_PUBLIC_API_URL+`topics`, options)
                .then(resp => resp.json())
                .then(result => {
                    console.log(result);
                    const lastId = result.id;   // 마지막에 값에 생성된 id
                    router.push(`/read/${lastId}`);
                    router.refresh();   // 서버 컴포넌트 리프레쉬
                });
        }}>
            <p>
                <input type="text" name="title" placeholder="title" />
            </p>
            <p>
                <textarea name="body" placeholder="body"></textarea>
            </p>
            <p>
                <button type="submit" value="create">create</button>
            </p>
        </form>
    )
}