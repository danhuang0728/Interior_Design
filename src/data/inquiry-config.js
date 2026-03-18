export const quickReplies = [
  '我想了解裝修流程',
  '我想預約丈量',
  '我想詢問報價方式',
  '我想了解服務地區',  //在這邊新增快捷訊問按鈕
]

const cannedReplies = [
  {
    keywords: ['流程', '裝修', '全屋'],   //keyword是觸發回復的關鍵詞
    reply:
      '目前的服務流程通常會先從需求了解開始，再安排丈量、初步提案與報價，確認方向後才進入細部設計與施工排程。',
  },
  {
    keywords: ['預約', '丈量', '到府'],
    reply:
      '可以先留下空間坪數、地點與偏好的聯絡時間，後續就能安排丈量與初步討論。',
  },
  {
    keywords: ['報價', '費用', '預算'],
    reply:
      '報價會依照空間類型、坪數、施工範圍與材料需求調整，建議先提供需求方向，才能給你更接近實際的估算。',
  },
  {
    keywords: ['地區', '台北', '新北', '桃園'],
    reply:
      '目前可先在網站上留下需求，後續會再依地區與案件內容確認是否安排服務與聯繫方式。',
  },
]

export const lineContact = {
  title: 'LINE 官方帳號',
  friendId: '@liuangel.ns',
  description:
    '第一版先以前端展示聊天流程為主，第二階段會在這裡接上 LINE 加好友按鈕、QR Code 或客服轉接入口。',
}

export const chatBridgeConfig = {
  mode: 'demo',
  futureApiBase: '/api/inquiries',
  futureProvider: 'LINE Official Account',
}

export function getAutoReply(message) {
  const normalizedMessage = message.trim()

  const matchedReply = cannedReplies.find(({ keywords }) =>
    keywords.some((keyword) => normalizedMessage.includes(keyword))
  )

  if (matchedReply) {
    return matchedReply.reply
  }

  return '已收到你的需求，若方便的話可以再補充空間類型、坪數、預算範圍與希望完成時間，這樣後續會更好安排。'
}
