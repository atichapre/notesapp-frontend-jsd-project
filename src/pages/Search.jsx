export default function Search() {
  return (
    <div className="bg-greenBackground">
      <div className="container__div">
        <main className="min-h-screen min-w-full flex-col pt-[3%]">
          <input
            type="text"
            className="bg-text flex w-[75%] items-center justify-self-center rounded-2xl px-4 py-2 min-[1024px]:hidden"
            placeholder="Search"
          />
          <ShowAll />
        </main>
      </div>
    </div>
  );
}
