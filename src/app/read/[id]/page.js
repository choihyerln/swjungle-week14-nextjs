export default async function Read(props) {
    // id 값을 url에 반영해서 데이터를 가져옴
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + `topics/${props.params.id}`, { cache: 'no-store' });
    const topic = await resp.json();

    return (
        <>
            <h2>{topic.title}</h2>
            {topic.body}
        </>
    )
}