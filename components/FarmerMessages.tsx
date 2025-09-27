'use client'

import { useState, useEffect } from 'react'
import { useFarmerAuth } from '@/components/FarmerAuthProvider'

interface Message {
  id: string
  senderId: string
  senderName: string
  senderType: 'farmer' | 'customer'
  content: string
  timestamp: string
  read: boolean
}

interface Conversation {
  id: string
  customerId: string
  customerName: string
  lastMessage: Message
  unreadCount: number
  messages: Message[]
}

// Mock data for demonstration
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    customerId: 'customer1',
    customerName: 'Fresh Market Store',
    unreadCount: 2,
    lastMessage: {
      id: 'msg3',
      senderId: 'customer1',
      senderName: 'Fresh Market Store',
      senderType: 'customer',
      content: 'Do you have any organic tomatoes available for next week?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false
    },
    messages: [
      {
        id: 'msg1',
        senderId: 'farmer1',
        senderName: 'Green Valley Farm',
        senderType: 'farmer',
        content: 'Hello! Thanks for your interest in our produce.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg2',
        senderId: 'customer1',
        senderName: 'Fresh Market Store',
        senderType: 'customer',
        content: 'Hi! I saw your listing for tomatoes. What varieties do you grow?',
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg3',
        senderId: 'customer1',
        senderName: 'Fresh Market Store',
        senderType: 'customer',
        content: 'Do you have any organic tomatoes available for next week?',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false
      }
    ]
  },
  {
    id: 'conv2',
    customerId: 'customer2',
    customerName: 'Organic Plus',
    unreadCount: 0,
    lastMessage: {
      id: 'msg4',
      senderId: 'farmer1',
      senderName: 'Green Valley Farm',
      senderType: 'farmer',
      content: 'Great! I can have that ready for pickup on Friday.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    messages: [
      {
        id: 'msg4',
        senderId: 'farmer1',
        senderName: 'Green Valley Farm',
        senderType: 'farmer',
        content: 'Great! I can have that ready for pickup on Friday.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        read: true
      }
    ]
  }
]

export function FarmerMessages() {
  const { farmer } = useFarmerAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    // Load conversations from localStorage or use mock data
    const savedConversations = localStorage.getItem(`farmer_conversations_${farmer?.id}`)
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations))
    } else {
      setConversations(MOCK_CONVERSATIONS)
    }
  }, [farmer?.id])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !farmer) return

    setIsSending(true)
    
    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: farmer.id,
      senderName: farmer.name,
      senderType: 'farmer',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: true
    }

    // Update conversations
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          lastMessage: message
        }
      }
      return conv
    })

    setConversations(updatedConversations)
    setSelectedConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, message],
      lastMessage: message
    } : null)

    // Save to localStorage
    localStorage.setItem(`farmer_conversations_${farmer.id}`, JSON.stringify(updatedConversations))
    
    setNewMessage('')
    setIsSending(false)
  }

  const markAsRead = (conversationId: string) => {
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map(msg => ({ ...msg, read: true }))
        }
      }
      return conv
    })
    setConversations(updatedConversations)
    if (farmer) {
      localStorage.setItem(`farmer_conversations_${farmer.id}`, JSON.stringify(updatedConversations))
    }
  }

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <div className="bg-white rounded-lg shadow-sm h-96 flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">
            Messages {totalUnread > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {totalUnread}
              </span>
            )}
          </h3>
        </div>
        <div className="overflow-y-auto h-80">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <div className="text-2xl mb-2">💬</div>
              <p className="text-sm">No conversations yet</p>
            </div>
          ) : (
            conversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => {
                  setSelectedConversation(conversation)
                  markAsRead(conversation.id)
                }}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation?.id === conversation.id ? 'bg-primary-50' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm text-gray-900 truncate">
                    {conversation.customerName}
                  </h4>
                  {conversation.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 truncate mb-1">
                  {conversation.lastMessage.content}
                </p>
                <p className="text-xs text-gray-400">
                  {formatTime(conversation.lastMessage.timestamp)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message View */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">
                {selectedConversation.customerName}
              </h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selectedConversation.messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.senderType === 'farmer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.senderType === 'farmer'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderType === 'farmer' ? 'text-primary-200' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isSending}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isSending ? '...' : 'Send'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">💬</div>
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
