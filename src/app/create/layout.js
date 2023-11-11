export default function Layout(props) {
    return (
        <section>
            <h2>여기는 create 폴더 안에 있는 layout.js!!!</h2>
            {props.children}
        </section>
    )
}
