import './InactivityCurtain.css'

function InactivityCurtain(
  { isTypingContainerFocused }: { isTypingContainerFocused: number },
) {
  const inactivityCurtain = (
    <div id='inactivity-curtain'>
      Click here or type any key to continue
    </div>
  )
  return !isTypingContainerFocused ? inactivityCurtain : null
}

export default InactivityCurtain
