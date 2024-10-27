import "~/style.css"

import { useStorage } from "@plasmohq/storage/hook"

import Home from "./pages/home"
import Login from "./pages/login"

function IndexPopup() {
  const [userData] = useStorage("user_data")
  return (
    <div className="min-w-[400px]">
      {userData?.access_token ? <Home /> : <Login />}
    </div>
  )
}

export default IndexPopup
