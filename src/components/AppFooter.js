import "./AppFooter.css"
// import EmailIcon from "@mui/icons-material/Email"
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid"

function AppFooter() {
  /**
   *  Sticky top <Navbar sticky="top" />
   *  Fixed top <Navbar fixed="top" />
   *  Nav className = ms-auto... : 우측정렬 / me-auto : 좌측정렬
   *
   */
  let TextCopyright =
    `\n` +
    `
    경기 화성시 장안면 돌서지길 132-12 (주)엠보틀
    연락처 : 031-356-2846` +
    ` 이메일 : sales@m-bottle.com
    ` +
    `© ` +
    new Date().getFullYear() +
    `. MBOTTLE.com` +
    `All rights reserved.`

  return (
    <div className="Footer">
      <div className="Footer-Menu-Left"> {TextCopyright} </div>
      <div className="Footer-Menu-Right">
        <PhoneAndroidIcon sx={{ fontSize: "30px" }} color="action" />
      </div>
    </div>
  )
}

export default AppFooter
