export default function Home() {
  return (
    <main>
      <div className="container__div">
        <div className="flex flex-col w-[50%] justify-self-center">
      <p>Take a note</p>
      <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-white focus:ring-0 dark:text-gray dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
              </div>
              </div>
    </main>
  );
}
