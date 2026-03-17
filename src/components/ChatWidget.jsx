import { useEffect, useRef, useState } from 'react'
import { chatBridgeConfig, getAutoReply, quickReplies } from '../data/inquiry-config'
import './ChatWidget.css'

const createMessage = (role, text) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  text,
  time: new Date().toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
  }),
})

const initialMessages = [
  createMessage(
    'assistant',
    '您好，歡迎使用線上詢問。你可以先描述空間需求，或直接點選下方常見問題。'
  ),
]

function ChatWidget() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isReplying, setIsReplying] = useState(false)
  const replyTimeoutRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isReplying])

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        clearTimeout(replyTimeoutRef.current)
      }
    }
  }, [])

  const queueReply = (text) => {
    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current)
    }

    setIsReplying(true)

    replyTimeoutRef.current = window.setTimeout(() => {
      setMessages((currentMessages) => [...currentMessages, createMessage('assistant', getAutoReply(text))])
      setIsReplying(false)
    }, 800)
  }

  const submitMessage = (text) => {
    const normalizedText = text.trim()

    if (!normalizedText) {
      return
    }

    setMessages((currentMessages) => [...currentMessages, createMessage('user', normalizedText)])
    setInputValue('')
    queueReply(normalizedText)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitMessage(inputValue)
  }

  return (
    <section className="chat-widget">
      <div className="chat-widget__header">
        <div>
          <span className="chat-widget__badge">即時回覆展示</span>
          <h2>線上客服視窗</h2>
        </div>
        <span className="chat-widget__status">
          模式：{chatBridgeConfig.mode === 'demo' ? '前端展示版' : '正式串接'}
        </span>
      </div>

      <div className="chat-widget__quick-replies">
        {quickReplies.map((reply) => (
          <button
            key={reply}
            type="button"
            className="chat-widget__quick-reply"
            onClick={() => submitMessage(reply)}
            disabled={isReplying}
          >
            {reply}
          </button>
        ))}
      </div>

      <div className="chat-widget__messages" aria-live="polite">
        {messages.map((message) => (
          <article
            key={message.id}
            className={`chat-widget__message chat-widget__message--${message.role}`}
          >
            <div className="chat-widget__avatar">
              {message.role === 'assistant' ? '客服' : '你'}
            </div>
            <div className="chat-widget__bubble-group">
              <p className="chat-widget__bubble">{message.text}</p>
              <span className="chat-widget__time">{message.time}</span>
            </div>
          </article>
        ))}

        {isReplying && (
          <article className="chat-widget__message chat-widget__message--assistant">
            <div className="chat-widget__avatar">客服</div>
            <div className="chat-widget__bubble-group">
              <p className="chat-widget__bubble chat-widget__bubble--typing">正在整理回覆...</p>
            </div>
          </article>
        )}
        <div ref={bottomRef} />
      </div>

      <form className="chat-widget__composer" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-widget__input"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="例如：我想詢問 20 坪舊屋翻新的流程"
          disabled={isReplying}
        />
        <button type="submit" className="chat-widget__send" disabled={isReplying}>
          送出
        </button>
      </form>
    </section>
  )
}

export default ChatWidget
