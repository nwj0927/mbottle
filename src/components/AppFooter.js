import "./AppFooter.css"
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid"
import EmailIcon from "@mui/icons-material/Email"
import ChatBubbleIcon from "@mui/icons-material/ChatBubble" // 카카오톡 대체 아이콘

function AppFooter() {
  const currentYear = new Date().getFullYear()
  return (
    <div className="Footer">
      <div className="Footer-Menu-Left">
        <p className="Footer-Text">
          경기 화성시 장안면 돌서지길 132-12 (주)엠보틀
          <br />
          연락처: 031-356-2846
          <br />
          이메일: sales@m-bottle.com
          <br />© {currentYear} MBOTTLE.com All rights reserved.
        </p>
      </div>
      <div className="Footer-Menu-Right">
        <a href="tel:0313562846" className="Footer-Icon" title="전화 걸기">
          <PhoneAndroidIcon sx={{ fontSize: 28 }} />
        </a>
        <a
          href="mailto:sales@m-bottle.com"
          className="Footer-Icon"
          title="이메일 보내기"
        >
          <EmailIcon sx={{ fontSize: 28 }} />
        </a>
        <a
          href="http://pf.kakao.com/_xyz123" // ← 실제 카카오채널 링크로 바꿔주세요
          target="_blank"
          rel="noopener noreferrer"
          className="Footer-Icon"
          title="카카오톡으로 문의"
        >
          <ChatBubbleIcon sx={{ fontSize: 28 }} />
        </a>
      </div>
    </div>
  )
}

export default AppFooter
