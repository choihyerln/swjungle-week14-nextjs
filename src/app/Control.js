"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  // console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀", params);
  return (
    <ul>
      <li><Link href="/create">Create</Link></li>
      {id ? <>
        <li><Link href={"/update/"+id}>Update</Link></li>
        <li><input type="button" value="delete" onClick={() => {
          const options = { method: 'DELETE' }
          // 삭제를 하기 위해선 서버쪽으로 method를 delete로 보내야함
          fetch(process.env.NEXT_PUBLIC_API_URL+`topics/${id}`, options)
            .then(res=>res.json())
            .then(result => {
              router.push('/');
              router.refresh();
            });
        }} /></li>
      </> : null}
    </ul>
  );
}
