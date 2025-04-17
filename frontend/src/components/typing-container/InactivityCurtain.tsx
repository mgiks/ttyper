import './InactivityCurtain.css'

function InactivityCurtain(
  { typingContainerFocusCount }: { typingContainerFocusCount: number },
) {
  const inactivityCurtain = (
    <div id='inactivity-curtain'>
      Click here or type any key to continue
    </div>
  )
  return typingContainerFocusCount === 0 ? inactivityCurtain : null
}

export default InactivityCurtain
