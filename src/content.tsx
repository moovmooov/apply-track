import { useButtonState } from "@/hooks/useButtonState"
import { useNavigation } from "@/hooks/useNavigation"
import { usePageReady } from "@/hooks/usePageReady"
import { getButtonContainer, getJobInformation } from "@/utils/dom-utils"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

import { sendToBackground } from "@plasmohq/messaging"

import ButtonTracker from "./components/Button"

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/jobs/*"]
}

const TrackerButton = () => {
  const containerRef = useRef<HTMLElement | null>(null)
  const urlRef = useRef(window.location.href)

  const { isPageReady, setIsPageReady, waitForElements } = usePageReady()
  const { buttonState, setButtonState, updateButtonStatus } = useButtonState()

  useNavigation({
    urlRef,
    setIsPageReady,
    waitForElements,
    updateButtonStatus
  })

  const handleButton = async () => {
    const jobInfo = getJobInformation()

    try {
      setButtonState({
        text: "Adding...",
        status: "loading"
      })

      await sendToBackground({
        name: "embed-button",
        body: jobInfo
      })

      setButtonState({
        text: "Added",
        status: "added"
      })
    } catch (error) {
      console.error(error)
      setButtonState({
        text: "Error to add the job into database",
        status: "error"
      })
    }
  }

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        await waitForElements()
        const container = getButtonContainer()

        if (container) {
          containerRef.current = container
          urlRef.current = window.location.href
          await updateButtonStatus(urlRef.current)
          setIsPageReady(true)
        }
      } catch (error) {
        console.error("Error initializing component:", error)
      }
    }

    initializeComponent()
  }, [
    waitForElements,
    updateButtonStatus,
    setIsPageReady,
    window.location.href
  ])

  if (!isPageReady || !containerRef.current) return null

  return createPortal(
    <div style={{ paddingLeft: 10 }}>
      <ButtonTracker
        onClick={handleButton}
        variant={buttonState.status}
        disabled={
          buttonState.status === "disabled" || buttonState.status === "added"
        }>
        {buttonState.text}
      </ButtonTracker>
    </div>,
    containerRef.current
  )
}

export default TrackerButton
