// ✅ 이렇게 변경해주세요: import fs from "fs/promises"
import fs from "fs/promises" // ES 모듈 방식의 fs.promises 모듈을 가져옵니다.

async function getCarouselImages() {
  try {
    const imgFile = await fs.readdir("./src/layout/Carousel")

    // 각 파일 이름을 콘솔에 출력 (디버깅용)
    imgFile.forEach((e) => {
      console.log(e)
    })

    console.log("원본 파일 목록 (imgFile):", imgFile) // 전체 목록 출력

    // 여기서 필요한 경우 필터링 로직을 추가할 수 있습니다.
    // 예: 'index' 문자열이 포함되지 않은 파일만 반환
    const filteredImgFile = imgFile.filter((fileName) => {
      return !fileName.includes("index")
    })
    console.log("'index' 제거된 파일 목록:", filteredImgFile)

    // 이 함수를 호출한 곳으로 imgFile (또는 filteredImgFile)을 반환합니다.
    return filteredImgFile // 필터링된 목록을 반환하는 것이 더 의도에 맞을 수 있습니다.
  } catch (error) {
    console.error("파일을 읽는 도중 오류가 발생했습니다:", error)
    return [] // 오류 발생 시 빈 배열 반환 또는 적절한 처리
  }
}

// 이 함수 자체를 다른 파일에서 import하여 사용할 수 있도록 export 합니다.
export default getCarouselImages

// TEST 함수
getCarouselImages()
