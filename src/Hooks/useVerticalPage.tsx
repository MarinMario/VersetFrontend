import useWindowSize from "./useWindowSize"

function useVerticalPage() {

  const windowSize = useWindowSize()
  const verticalPage = windowSize.height > windowSize.width

  return verticalPage
}

export default useVerticalPage