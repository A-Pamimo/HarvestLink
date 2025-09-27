'use client'

import { useState, useEffect } from 'react'
import { useCustomerAuth } from '@/components/CustomerAuthProvider'

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
  farmerId: string
  farmerName: string
  lastMessage: Message
  unreadCount: number
  messages: Message[]
}

// Mock data for demonstration
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    farmerId: 'farmer1',
    farmerName: 'Green Valley Farm',
    unreadCount: 1,
    lastMessage: {
      id: 'msg3',
      senderId: 'farmer1',
      senderName: 'Green Valley Farm',
      senderType: 'farmer',
      content: 'Yes, we have 50kg of organic tomatoes ready for harvest this week. Would you like to place an order?',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      read: false
    },
    messages: [
      {
        id: 'msg1',
        senderId: 'customer1',
        senderName: 'Fresh Market Store',
        senderType: 'customer',
        content: 'Hello! I saw your listing for organic tomatoes. Do you have any available for next week?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg2',
        senderId: 'farmer1',
        senderName: 'Green Valley Farm',
        senderType: 'farmer',
        content: 'Hi! Thanks for your interest. What quantity are you looking for?',
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg3',
        senderId: 'farmer1',
        senderName: 'Green Valley Farm',
        senderType: 'farmer',
        content: 'Yes, we have 50kg of organic tomatoes ready for harvest this week. Would you like to place an order?',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        read: false
      }
    ]
  },
  {
    id: 'conv2',
    farmerId: 'farmer2',
    farmerName: 'Sunny Acres',
    unreadCount: 0,
    lastMessage: {
      id: 'msg4',
      senderId: 'customer1',
      senderName: 'Fresh Market Store',
      senderType: 'customer',
      content: 'Perfect! I\'ll take 25kg. When can I pick it up?',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    messages: [
      {
        id: 'msg4',
        senderId: 'customer1',
        senderName: 'Fresh Market Store',
        senderType: 'customer',
        content: 'Perfect! I\'ll take 25kg. When can I pick it up?',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        read: true
      }
    ]
  }
]

export function CustomerMessages() {
  const { customer } = useCustomerAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    // Load conversations from localStorage or use mock data
    const savedConversations = localStorage.getItem(`customer_conversations_${customer?.id}`)
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations))
    } else {
      setConversations(MOCK_CONVERSATIONS)
    }
  }, [customer?.id])

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
    if (!newMessage.trim() || !selectedConversation || !customer) return

    setIsSending(true)
    
    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: customer.id,
      senderName: customer.name,
      senderType: 'customer',
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
    localStorage.setItem(`customer_conversations_${customer.id}`, JSON.stringify(updatedConversations))
    
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
    if (customer) {
      localStorage.setItem(`customer_conversations_${customer.id}`, JSON.stringify(updatedConversations))
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
                  selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm text-gray-900 truncate">
                    🚜 {conversation.farmerName}
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
                🚜 {selectedConversation.farmerName}
              </h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selectedConversation.messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.senderType === 'customer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.senderType === 'customer'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderType === 'customer' ? 'text-blue-200' : 'text-gray-500'
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
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isSending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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
