import { useState } from "react";
import { Modal } from "./components/modal";
import { Navbar } from "./components/navbar";
import { InitialLoader } from "./components/initial-loader";
import { ConvertForm } from "./components/convert-form";

export function App() {
  const [initialLoading, setInitialLoading] = useState(true)

  return (
    <div className="relative p-3 w-full h-screen bg-gradient-to-tr from-green-600 to-green-400 flex items-center justify-center">
      <Navbar />
      <Modal>
        {initialLoading && (
          <InitialLoader />
        )}
        <ConvertForm initialLoaderSetter={setInitialLoading} />
      </Modal>
    </div>
  )
}