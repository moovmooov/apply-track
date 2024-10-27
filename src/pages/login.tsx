import { LogIn } from "lucide-react"

import { sendToBackground } from "@plasmohq/messaging"

const auth = async () => {
  await sendToBackground({
    name: "oauth"
  })
}

const Login = () => {
  return (
    <div className="w-full max-w-md p-8 bg-white font-sans shadow-lg rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Apply Tracker</h1>
        <p className="text-sm text-gray-600 mt-2">
          Save LinkedIn job applications directly to a Notion database with one
          click.
        </p>
      </div>

      <button
        type="button"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded transition duration-300 flex items-center justify-center gap-2"
        onClick={auth}>
        <LogIn size={20} />
        Login with Notion
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="https://www.notion.so/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
