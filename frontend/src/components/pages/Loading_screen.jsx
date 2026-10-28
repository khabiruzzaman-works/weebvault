export default function Loading_screen() {
  return (<>
    <main className="w-full min-h-screen bg-blue-900 flex flex-col items-center justify-center">

      <div className="flex items-center justify-center gap-2">
        <span className="size-8 animate-[spin_0.8s_linear_infinite] rounded-full border-[3px] border-blue-900/30 border-t-blue-200"></span>
        <span className="text-blue-300">Loading</span>
      </div>
    </main>
  </>)
}
