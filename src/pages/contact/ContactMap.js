import { useEffect } from "react"

function ContactMap() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=71c1fd5d1e14469f1c045071a05cc3e0&autoload=false`
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map")
        const options = {
          center: new window.kakao.maps.LatLng(
            37.13689161300047,
            126.83849525519456
          ),
          level: 4,
        }
        const map = new window.kakao.maps.Map(container, options)

        // ✅ 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(
          37.13689161300047,
          126.83849525519456
        )
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })
        marker.setMap(map)

        // ✅ 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content:
            '<div style="padding:8px;font-size:14px;color:#000;">엠보틀<br/>경기도 화성시 장안면 돌서지길 132-12</div>',
        })

        infowindow.open(map, marker)
      })
    }
    document.head.appendChild(script)
  }, [])

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>
}

export default ContactMap
