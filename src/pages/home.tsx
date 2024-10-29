import type { Database } from "@/types"
import { ExternalLink, LogOut } from "lucide-react"

import { useStorage } from "@plasmohq/storage/hook"

const Home = () => {
  const [database] = useStorage<Database>("database")
  const [userData, setUserData] = useStorage("user_data")

  return (
    <div className="w-full max-w-md p-6 bg-white font-sans shadow-sm rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={userData?.owner.user.avatar_url}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {userData?.owner.user.name}
            </h2>
            <p className="text-xs text-gray-600">
              Tracker on {userData?.workspace_icon} {userData?.workspace_name}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setUserData(null)}>
          <LogOut size={18} />
        </button>
      </div>

      <a
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300 flex items-center justify-center gap-2"
        href={database?.url}
        target="_blank"
        rel="noreferrer">
        <ExternalLink size={18} />
        Open Job Tracker on Notion
      </a>

      <div className="mt-1 text-center flex flex-col">
        <hr className="w-full my-4 border-t border-gray-200" />
        <div className="flex text-center justify-center gap-x-4">
          <a
            href="https://github.com/moovmooov/apply-tracker"
            className="text-blue-600 hover:underline text-sm font-semibold"
            target="_blank"
            rel="noreferrer">
            View on Github
          </a>
          <a
            href="https://www.linkedin.com/in/mateusmoov/"
            className="text-blue-600 hover:underline text-sm font-semibold"
            target="_blank"
            rel="noreferrer">
            Hire Me
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
