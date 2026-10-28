export default function Not_found_screen() {
  return (<>
    <main className="w-full min-h-screen bg-blue-900 flex flex-col items-center justify-center">

      <div className="flex flex-col items-center justify-center gap-2">
        <div className= "flex gap-1 justify-center items-center text-blue-200 text-3xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-x preview-icon"><path d="m13.5 8.5-5 5" /><path d="m8.5 8.5 5 5" /><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <span>
          404
          </span>
        </div>
        <span className="text-blue-300">Not Found</span>
      </div>
    </main>
  </>)
}
